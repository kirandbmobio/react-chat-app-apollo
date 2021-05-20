const { GraphQLServer, PubSub } = require("graphql-yoga");
const mongoose = require("mongoose");

const { typeDefs, resolvers } = require("./graphql");

mongoose.connect("mongodb://localhost:27017/react-chat-o-matic", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection: error"));

db.once("open", function () {
  // we're connected!
  console.log("connected!");
});

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(({ port }) => console.log(`Server start at ${port}`));
