const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");

//Comment Routes
//Since linked from server js treat each path as:
//comment/:id, comment/createPost, comment/likePost/:id, comment/deletePost/:id

router.post("/createComment/:id", commentController.createComment);
router.put("/likeComment/:storyId/:commentId", commentController.likeComment);

router.delete("/deleteComment/:storyId/:commentId", commentController.deleteComment);


module.exports = router;
