const { ApolloServer, AuthenticationError } = require('apollo-server-express');

const typeDefs = require('./src/typeDefs');
const resolvers = require('./src/resolvers');
const authService = require('./services/AuthService');
const { dataSources } = require('./src/datasources');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => {
    try {
      const token =
        (req.headers.authorization &&
          req.headers.authorization.replace('Bearer ', '')) ||
        '';

      const user = authService.verify(token);

      return { user };
    } catch (error) {
      console.log(error);
      throw new AuthenticationError('Authentication error');
    }
  },
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

module.exports = server;
