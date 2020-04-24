const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const db = require('./db/mongo-client');
const ApolloServer = require('./ApolloServer');
const AuthService = require('./services/AuthService');
const MailService = require('./services/MailService');

const CORS_CONFIG = {
  credentials: true,
  origin: process.env.CLIENT_URL || '*',
};

try {
  (async () => {
    // .env configuration
    dotenv.config();

    MailService.config();

    // Database configuration
    await db.config();
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGODB_NAME,
    });

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
    try {
      // TODO Auth logic To Sign In and Sign Up
      app.post('/auth', AuthService.signIn);
      app.post('/register', AuthService.register);
      app.post('/reset-password', AuthService.resetPassword);
      app.post('/set-new-password', AuthService.setNewPassword);
    } catch (error) {
      app.response.status(500);
    }

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
} catch (error) {
  console.error(error);
  app.response.status(500).json({ message: error.message });
}
