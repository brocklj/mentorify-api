const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const defaultMessage = {
  from: 'info@mentorify.org',
  to: '',
  subject: '',
  html: '',
};

const MailService = {
  transporter: null,

  config: () => {
    console.log('MailService configured');
    this.transporter = nodemailer.createTransport({
      port: process.env.SMTP_PORT,
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  },

  sendVerificationEmail: async (email) => {
    const token = jwt.sign({ email }, process.env.APP_SECRET, {
      expiresIn: Date.now(),
    });

    const link = `${process.env.CLIENT_URL}/verify?token=${token}`;
    const message = {
      ...defaultMessage,
      to: email,
      subject: 'Welcome to mentorify - email verification',
      html: `<h2>Welcome to mentorify</h2> \n
                <a href="${link}">Please, verify your email here</a>`,
    };
    return await this.transporter.sendMail(message);
  },

  sendResetPasswordEmail: async (email) => {
    //TODO: Add session token ID in order to be accesable only once
    const token = jwt.sign({ email }, process.env.APP_SECRET, {
      expiresIn: Date.now() + 3600 * 1000,
    });
    const link = `${process.env.CLIENT_URL}/set-new-password?token=${token}`;
    const message = {
      ...defaultMessage,
      to: email,
      subject: 'Reset your password',
      html: `<p>Reset your password by clicking on <a href="${link}">link</a></p>`,
    };
    try {
      return await this.transporter.sendMail(message);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = MailService;
