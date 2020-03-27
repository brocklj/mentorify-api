const mongo = require('mongodb');

const db = mongo.MongoClient;
function config() {
  db.connect(process.env.MONGODB_URI, { useUnifiedTopology: true });
}

module.exports = { db, config };
