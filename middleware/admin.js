const admin = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    return next();
  }

  return res.status(403).json({ msg: 'Permission denied' });
}

module.exports = admin;
