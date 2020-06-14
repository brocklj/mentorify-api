const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('./db/mongoose');

const db = require('./db/mongo-client');
const ApolloServer = require('./ApolloServer');
const AuthService = require('./services/AuthService');
const MailService = require('./services/MailService');
const errorHandler = require('./utils/ErrorHandler');

const CORS_CONFIG = {
  credentials: true,
  origin: process.env.CLIENT_URL || '*',
};

(async () => {
  // .env configuration
  dotenv.config();

  MailService.config();

  // Database configuration
  await db.config();
  await mongoose.config();

  // Start epxress app
  const app = express();

  app.use(cors(CORS_CONFIG));
  app.use(bodyParser.json());
  app.use(bodyParser.text({ type: 'text/html' }));
  app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use('/', (req, res, next) => {
    console.log(`${new Date().toUTCString()} ${req.method}:${req.url}`);
    next();
  });

  // TODO Auth logic To Sign In and Sign Up
  app.post('/auth', errorHandler(AuthService.signIn));
  app.post('/register', errorHandler(AuthService.register));
  app.post('/reset-password', errorHandler(AuthService.resetPassword));
  app.post('/set-new-password', errorHandler(AuthService.setNewPassword));

  // Apply ApolloServer middleware
  ApolloServer.applyMiddleware({
    app,
    cors: CORS_CONFIG,
  });

  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
    console.log(
      `ApolloServer is listening on: http://localhost:${PORT}${ApolloServer.graphqlPath}`
    );
  });
})();
