const MongoClient = require('mongodb').MongoClient;
let client = {};

client.config = async function() {
  try {
    client.mongoClient = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.mongoClient.connect();
    console.log('Successfully connected the DB.');
    client.db = client.mongoClient.db(process.env.MONGODB_NAME);
  } catch (error) {
    console.log(error);
  }
};

module.exports = client;
