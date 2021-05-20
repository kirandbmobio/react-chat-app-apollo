const Message = require("../../model/messages");

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);
const resolver = {
  Query: {
    messages: async (parent, { user, content }) => {
      let messages = await Message.find({});
      return messages;
    },
  },
  Mutation: {
    postMessage: async (parent, { user, content }) => {
      let message = await Message.create({ user, content });
      let messages = await Message.find({});
      subscribers.forEach((fn) => fn(messages));
      return message;
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
