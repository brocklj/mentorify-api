const mongoose = require('mongoose');
const { UserSchema } = require('../schema/UserSchema');
const { InterestSchema } = require('../schema/InterestSchema');
const { MessageSchema } = require('../schema/MessageSchema');
const { ConversationSchema } = require('../schema/ConversationSchema');

const model = mongoose.model;

module.exports = {
  Interest: model('Interest', InterestSchema),
  User: model('User', UserSchema),
  Message: model('Message', MessageSchema),
  Conversation: model('Conversation', ConversationSchema),
};
