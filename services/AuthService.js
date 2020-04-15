const jwt = require('jsonwebtoken');
const { User } = require('../src/models');

function verify(token) {
  return jwt.verify(token, process.env.APP_SECRET);
}

async function register(req, res) {
  const { email, name, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  //TODO: ADD password salt
  const hash = jwt.sign(password, process.env.APP_SECRET);
  await User.create({ email, hash, name });

  return await res.json({ email, name });
}

async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw 'User not exist';
    }
    //TODO: ADD password salt
    const passwordDecoded = verify(user.hash);

    if (passwordDecoded !== password) {
      throw 'Wrong password';
    }

    const token = jwt.sign({ email }, process.env.APP_SECRET);

    return res.json({ email, token });
  } catch (e) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }
}

async function resetPassword(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User does not exist!' });
  }
}

module.exports = { register, signIn, verify, resetPassword };
