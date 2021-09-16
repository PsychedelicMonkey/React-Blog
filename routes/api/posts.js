const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const { body, validationResult } = require('express-validator');

const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user')
      .sort('-createdAt');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate('user')

    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', 
  body('title').notEmpty().withMessage('Please enter a title'),
  body('content').notEmpty().withMessage('Content cannot be empty'),
auth, admin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content } = req.body;

  try {
    const post = await Post.create({ title, content, user: req.user });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/comments/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const post = await Post.findById(id);
    const comment = await Comment.create({ content, user: req.user, });

    post.comments.unshift(comment);
    await post.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
