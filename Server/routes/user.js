const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

const {
  getProfile,
  updatePic,
  followersUpdate,
  unfollowersUpdate,
  getAllUsers,
} = require("../controllers/userController");

router.get("/user/:id", requireLogin, getProfile);

router.put("/follow", requireLogin, followersUpdate);

router.put("/unfollow", requireLogin, unfollowersUpdate);

router.put("/updatepic", requireLogin, updatePic);

router.get("/allusers", requireLogin, getAllUsers);

module.exports = router;
