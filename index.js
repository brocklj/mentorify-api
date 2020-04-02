const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db/mongo-client');
const ApolloServer = require('./ApolloServer');
const AuthService = require('./service/AuthService');

try {
  (async () => {
    // .env configuration
    dotenv.config();

    // Database configuration
    await db.config();
    // Start epxress app
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.text({ type: 'text/html' }));
    app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use('/', (req, res, next) => {
      console.log(`${new Date().toUTCString()} ${req.method}:${req.url}`);
      next();
    });

    // TODO Auth logic To Sign In and Sign Up
    app.post('/auth', AuthService.signIn);

    app.post('/register', AuthService.register);

    // Apply ApolloServer middleware
    ApolloServer.applyMiddleware({ app });

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is listening on: http://localhost:${PORT}`);
      console.log(
        `ApolloServer is listening on: http://localhost:${PORT}${ApolloServer.graphqlPath}`
      );
    });
  })();
} catch (error) {
  console.error(error);
  app.user('/', (req, res) => res.code(500).json({ message: error.message }));
}
