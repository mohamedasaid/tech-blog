const express = require("express");
const auth = require("../middleware/auth");

const {
  getPosts,
  getAboutMe,
  getContact,
  getPostById,
  getWriteBlogPage,
  creatPost
} = require("../controller/post");

const router = express.Router();

router.route("/").get(getPosts);
router.route("/about").get(getAboutMe);
router.route("/contact").get(getContact);
router.route("/post/:id").get(getPostById);
router.route("/posts/create").post(creatPost);
router.route("/posts/new").get(auth, getWriteBlogPage);

module.exports = router;
