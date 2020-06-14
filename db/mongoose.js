const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const config = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGODB_NAME,
  });
};

module.exports = { config };
