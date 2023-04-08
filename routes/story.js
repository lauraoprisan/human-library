const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const storyController = require("../controllers/story");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id

router.get("/:id", ensureAuth, storyController.getStory);

//Enables user to create post w/ cloudinary for media uploads
router.post("/createStory", upload.single("file"), storyController.createStory);

//Enables user to like post. In controller, uses POST model to update likes by 1
router.put("/likeStory/:id", storyController.likeStory);

//Enables user to delete post. In controller, uses POST model to delete post from mongo.db collection
router.delete("/deleteStory/:id", storyController.deleteStory);

module.exports = router;
