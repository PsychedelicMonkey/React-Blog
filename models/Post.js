const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Post', Post);
