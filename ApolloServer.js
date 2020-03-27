const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
