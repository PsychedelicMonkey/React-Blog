const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/auth');

const User = require('../../models/User');

router.get('/', auth, admin, async (req, res) => {
  try {
    const users = await User.find()
      .select('+email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
