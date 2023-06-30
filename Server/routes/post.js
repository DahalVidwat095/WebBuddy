const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");
const {
  getAllPosts,
  createPost,
  myPosts,
  like,
  unlike,
  comment,
  deletePost,
  getSubPost,
} = require("../controllers/postController");

router.get("/allposts", requireLogin, getAllPosts);

router.post("/createpost", requireLogin, createPost);

router.get("/myposts", requireLogin, myPosts);

router.put("/like", requireLogin, like);

router.put("/unlike", requireLogin, unlike);

router.put("/comment", requireLogin, comment);

router.delete("/deletepost/:postId", requireLogin, deletePost);

router.get("/getsubpost", requireLogin, getSubPost);

module.exports = router;
