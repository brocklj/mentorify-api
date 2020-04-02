const jwt = require('jsonwebtoken');
const client = require('../db/mongo-client');

function verify(token) {
  return jwt.verify(token, process.env.APP_SECRET);
}

async function register(req, res) {
  const db = client.db;
  const { username, name, password } = req.body;

  const userCount = await db.collection('users').countDocuments({ username });

  if (userCount) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const hash = jwt.sign(password, process.env.APP_SECRET);
  await db.collection('users').insertOne({ username, password: hash, name });

  return await res.json({ username, name });
}

async function signIn(req, res) {
  try {
    const db = client.db;
    const { username, password } = req.body;
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      throw 'User not exist';
    }

    const passwordDecoded = verify(user.password);

    if (passwordDecoded !== password) {
      throw 'Wrong password';
    }

    const token = jwt.sign({ username }, process.env.APP_SECRET);

    return res.json({ username, token });
  } catch (e) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
}

module.exports = { register, signIn, verify };
