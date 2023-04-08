const express = require("express");
const router = express.Router();
const libraryController = require("../controllers/library");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id

router.get("/", ensureAuth, libraryController.getStories);

module.exports = router;