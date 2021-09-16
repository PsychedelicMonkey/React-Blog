const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    defualt: Date.now,
  },
});

module.exports = mongoose.model('Comment', Comment);
