const express = require("express");

const router = express.Router();

const {
  getAllPost,
  getOnePost,
  createPost,
  editPost,
  deletePost,
  likePost,
  createPostComment,
  getPostComment,
  editPostComment,
  deletePostComment,
  notFound,
} = require("../controllers/postController");

const checkAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return res.status(400).json({ message: "Please log in to continue" });
  }
};

router.get("/", getAllPost);

router.get("/:post", getOnePost);

router.post("/", checkAuth, createPost);

router.put("/:post", checkAuth, editPost);

router.put("/:post/like", checkAuth, likePost);

router.delete("/:post", checkAuth, deletePost);

router.post("/:post/comments", checkAuth, createPostComment);

router.get("/:post/comments", checkAuth, getPostComment);

router.put("/:postId/:commentId", checkAuth, editPostComment);

router.delete("/:postId/:commentId", checkAuth, deletePostComment);

router.get("*", notFound);

module.exports = router;
