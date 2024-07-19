const express = require('express');
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  commentPost,
} = require('../controllers/postController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/posts', getPosts);
router.post('/posts', upload.single('image'), createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.put('/posts/like/:id', likePost);
router.put('/posts/dislike/:id', dislikePost);
router.post('/posts/comment/:id', commentPost);

module.exports = router;
