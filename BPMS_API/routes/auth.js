const router = require('express').Router();
const User = require('../models/userSchema');
const OTPModel = require('../models/otpSchema');
const bcrypt = require('bcrypt');
const moment = require('moment');
const nodemailer = require('nodemailer');
const { isEmpty, getRandomInt } = require('../helpers/utils');
const jwt = require('jsonwebtoken');

// Login
router.post('/login', async (req, res) => {
  try {
    //Find user
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).send('User not found.');

    // Check if password is valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json('Wrong password.');

    const token = jwt.sign(
      { name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '48h' }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (isEmpty(name) || isEmpty(email) || isEmpty(password))
      return res.status(400).send('Invalid Input');

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).send('Email already in use');
    }
    // Generate a new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    //Save User
    await newUser.save();

    const otp = await generateOTP(email);
    sendMail(email, otp);

    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

router.post('/resendotp', async (req, res) => {
  try {
    const { email } = req.body;

    const otp = await generateOTP(email);
    sendMail(email, otp);

    res.status(200).json('user created');
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

//Verify OTP
router.post('/verifyOtp', async (req, res) => {
  try {
    const { code, email } = req.body;

    const user = await User.findOne({ email: email });

    if (isEmpty(user)) return res.status(404).json('User does not exists');

    const otpCode = await OTPModel.findOne({ code: code, email: email });

    if (isEmpty(otpCode)) return res.status(404).json('Invalid OTP');

    //If current time is past otp expiry time (OTP is expired), show error
    if (moment().isAfter(otpCode.expireIn))
      return res.status(410).json('OTP has been expired');

    res.status(200).json('OTP verified successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

//Resend OTP
router.post('/resendOtp', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (isEmpty(user)) return res.status(404).send('User does not exists');

    const otp = await generateOTP(email);
    sendMail(email, otp);

    res.status(200).json('OTP sent successfully');
  } catch (err) {
    res.status(500).json(err);
  }
});

//Generate OTP Function
const generateOTP = async (email) => {
  const otpCode = getRandomInt(100000, 999999);
  const otpData = new OTPModel({
    email: email,
    code: otpCode,
    expireIn: new Date().getTime() + 600000, //Ten min from now
  });
  await otpData.save();

  return otpCode;
};

//Send Mail Function (for OTP code)
const sendMail = async (userEmail, otpCode) => {
  if (isEmpty(userEmail)) return;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: userEmail,
    subject: 'Verfication Code',
    text: `Your verification code is: ${otpCode}`,
    html: `<b>${otpCode}</b>`,
  });

  if (!info.messageId) console.error('Email not sent successfully');
};



module.exports = router;
