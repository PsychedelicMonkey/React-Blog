const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/load', auth, (req, res) => {
  res.json(req.user);
});

module.exports = router;
