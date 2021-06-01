const Message = require("../../model/messages");
const User = require("../../model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateUser } = require("../../util/validation");
const { JWT_SECRET } = require("../../config/env.json");
const { authenticateUser } = require("../../util/auth");

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);
const resolver = {
  Query: {
    getMessages: async (parent, { from }, context) => {
      try {
        console.log(context.user, from);
        if (!context.user) {
          return new Error("Unauthenticated");
        }
        let otherUser = await User.findOne({ username: from });
        if (!otherUser) {
          return new Error("User not found");
        }
        let usernames = [context.user.user.username, otherUser.username];
        console.log(usernames);
        let messages = await Message.find({
          $and: [
            { from: { $in: usernames } },
            {
              to: { $in: usernames },
            },
          ],
        });

        if (messages.length < 1) {
          return new Error("No Messages found!");
        }
        return messages;
      } catch (err) {
        console.log("err", err);
        return err;
      }
    },
    messages: async (parent, { user, content }, context) => {
      if (!context.user) {
        return new Error("Unauthenticated");
      }
      let messages = await Message.find({});
      return messages;
    },
    getUsers: async (parent, args, context) => {
      if (!context.user) {
        return new Error("Unauthenticated");
      }
      let users = await User.find({
        username: { $ne: context.user.user.username },
      });
      if (users.length < 1) {
        return new Error("No data found!");
      }
      const allUserMessages = await Message.find({
        $or: [
          { from: context.user.user.username },
          { to: context.user.user.username },
        ],
      }).sort({ createdAt: -1 });

      users = users.map((otherUser) => {
        const latestMessage = allUserMessages.find(
          (m) => m.from === otherUser.username || m.to === otherUser.username
        );
        otherUser.latestMessage = latestMessage;
        return otherUser;
      });
      return users;
    },
    login: async (parent, args) => {
      try {
        args.username = "1234";
        if (await validateUser({ userInput: args })) {
          return new Error("All data is required.");
        }
        let user = await User.findOne({
          email: args.email,
        });
        if (!user) {
          return new Error("User not found!");
        }
        const correctPassword = await bcrypt.compare(
          args.password,
          user.password
        );

        if (!correctPassword) {
          return new Error("Password is incorrect!");
        }
        let token = jwt.sign({ user: user }, JWT_SECRET, {
          expiresIn: "1h",
        });

        user.token = token;
        return user;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    postMessage: async (parent, { to, content }, context) => {
      try {
        if (!context.user) {
          return new Error("Unauthenticated");
        }
        let recipient = await User.findOne({ username: to });

        if (!recipient) {
          return new Error("No User Found!");
        } else if (recipient.username === context.user.user.username) {
          return new Error("You can't message yourself!");
        }
        let message = await Message.create({
          from: context.user.user.username,
          to,
          content,
        });
        let messages = await Message.find({});
        subscribers.forEach((fn) => fn(messages));
        return message;
      } catch (err) {
        return err;
      }
    },
    register: async (parent, args) => {
      try {
        let user;
        if (await validateUser(args)) {
          return new Error("All data is required.");
        }
        user = await User.findOne({
          $or: [
            { email: args.userInput.email },
            { username: args.userInput.username },
          ],
        });
        if (user) {
          return new Error("Already Exist");
        }
        /* hash password */
        args.userInput.password = await bcrypt.hash(args.userInput.password, 6);
        user = await User.create(args.userInput);
        return user;
      } catch (err) {
        return err;
      }
    },
  },

  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(async (messages) => {
          if (!messages) {
            messages = await Message.find({});
          }
          return pubsub.publish(channel, { messages });
        });
        setTimeout(async (messages) => {
          if (!messages) {
            messages = await Message.find({});
          }
          return pubsub.publish(channel, { messages });
        }, 0);
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

const resolvers = () => {
  return resolver;
};

module.exports = resolvers;
