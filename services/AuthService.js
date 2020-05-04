const jwt = require('jsonwebtoken');
const yup = require('yup');

const { User } = require('../src/models');
const MailService = require('./MailService');

function verify(token) {
  return jwt.verify(token, process.env.APP_SECRET);
}

function generatePasswordSalt(password) {
  return jwt.sign(password, process.env.APP_SECRET);
}

async function register(req, res) {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    name: yup.string().min(2).required(),
  });

  const { email, name, password } = await schema.validate(req.body);

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  //TODO: ADD password salt
  const hash = generatePasswordSalt(password);
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

  await MailService.sendResetPasswordEmail(user.email);
  return res
    .status(200)
    .json({ message: 'Password reset link successfully sent!' });
}

async function setNewPassword(req, res) {
  const { token } = req.query;
  const { newPass, newPassConfirm } = req.body;
  if (token) {
    try {
      const { email } = verify(token);
      if (newPass !== newPassConfirm) {
        throw new Error('Passwords do not match');
      }
      const hash = generatePasswordSalt(newPass);
      const user = await User.findOne({ email });
      user.hash = hash;
      await user.save();
      return await res.status(200).json({ message: 'Success!' });
    } catch (e) {
      return await res.status(400).json({ message: 'Something went wrong.' });
    }
  }
}

module.exports = { register, signIn, verify, resetPassword, setNewPassword };
