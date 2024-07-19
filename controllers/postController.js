//Backend/controllers/postController.js

const Post = require('../models/postModel');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createPost = async (req, res) => {
  const { heading, content, image } = req.body;
  try {
    const post = new Post({
      user: req.user.id,
      heading,
      content,
      image,
    });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const updatePost = async (req, res) => {
  const { heading, content, image } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    post.heading = heading || post.heading;
    post.content = content || post.content;
    post.image = image || post.image;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await post.remove();
    res.json({ message: 'Post removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const dislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.dislikes += 1;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const commentPost = async (req, res) => {
  const { text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    const comment = {
      user: req.user.id,
      text,
    };
    post.comments.push(comment);
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  commentPost,
};
