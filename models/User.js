const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    select: false,
  },
  password: {
    type: String,
    select: false,
  },
  googleId: {
    type: String,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    default: 'GUEST',
    enum: ['ADMIN', 'GUEST'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', User);
