const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), async (req, res) => {
  try {
    const token = await jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });

    res.send(`
      <html>
        <script>
          window.localStorage.setItem('token', '${token}');
          window.location.href = '/';
        </script>
      </html>
    `);
  } catch (err) {
    res.redirect('/login');
  }
});

module.exports = router;
