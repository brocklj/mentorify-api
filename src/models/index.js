const mongoose = require('mongoose');
const { UserSchema } = require('../schema/UserSchema');

const model = mongoose.model;

module.exports = {
  User: model('User', UserSchema),
};
