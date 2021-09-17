const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');
const { body, validationResult } = require('express-validator');

const Comment = require('../../models/Comment');
const Post = require('../../models/Post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .select('-comments')
      .populate('user')
      .sort('-createdAt');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get a post by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User',
          select: '-role -createdAt',
        },
      });

      if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
      }

    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add a new post
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

// Add a comment
router.post('/comments/:id', 
  body('content').notEmpty().withMessage('Comment cannot be empty'),
auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

// Delete a post
router.delete('/:id', auth, admin, async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    
    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Delete all comments from post
    await Comment.deleteMany({ _id: { $in: post.comments } });

    // Delete post
    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
