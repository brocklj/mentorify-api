const mongoose = require('mongoose');
const { UserSchema } = require('../schema/UserSchema');
const { InterestSchema } = require('../schema/InterestSchema');

const model = mongoose.model;

module.exports = {
  Interest: model('Interest', InterestSchema),
  User: model('User', UserSchema),
};
