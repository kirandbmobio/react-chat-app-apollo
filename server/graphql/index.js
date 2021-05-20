const typeDefs = require("./typedefs");
const resolvers = require("./resolver");
module.exports = {
  typeDefs: typeDefs(),
  resolvers: resolvers(),
};
