const dotenv = require('dotenv');
const db = require('./db');
const express = require('express');
const ApolloServer = require('./ApolloServer');

// Start epxress app
const app = express();

// .env configuration
dotenv.config();

// Database configuration
db.config();

app.use('/', (req, res, next) => {
  console.log(`${new Date().toUTCString()} ${req.method}:${req.url}`);
  next();
});

// TODO Auth logic To Sign In and Sign Up

// Apply ApolloServer middleware
ApolloServer.applyMiddleware({ app });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}`);
  console.log(
    `ApolloServer is listening on: http://localhost:${PORT}${ApolloServer.graphqlPath}`
  );
});
