const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');

router.post('/login', 
  body('email').notEmpty().withMessage('Email address required'),
  body('password').notEmpty().withMessage('Password required'),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .select('+password')  
      .exec();

    if (!user) {
      return res.status(400).json({ msg: 'Incorrect email address or password' });
    }

    const success = await bcrypt.compare(password, user.password);

    if (!success) {
      return res.status(400).json({ msg: 'Incorrect email address or password' });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/register', 
  body('firstName').notEmpty().withMessage('Please enter your name'),
  body('lastName').notEmpty().withMessage('Please enter your last name'),
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  body('email').custom(email => {
    return User.findOne({ email }).then(user => {
      if (user) {
        return Promise.reject('Please use different email address');
      }
    });
  }),
  body('password2').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords must match');
    }

    return true;
  }),
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    // Generate hash and salt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const image = gravatar.url(email, { d: 'identicon' }, true);

    const user = await User.create({ firstName, lastName, email, password: hash, image });

    const token = await jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
