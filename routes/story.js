const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const storyController = require("../controllers/story");
const { ensureAuth } = require("../middleware/auth");

//Post Routes
//Since linked from server js treat each path as:
//post/:id, post/createPost, post/likePost/:id, post/deletePost/:id

router.get("/:id", storyController.getStory);
// router.put("/viewedStory", storyController.viewedStory);

//Enables user to create post w/ cloudinary for media uploads
router.post("/createStory", upload.single("file"), storyController.createStory);


router.put("/likeStory/:id", storyController.likeStory);
router.put("/unlikeStory/:id", storyController.unlikeStory);
router.post("/favoriteStory/:id", storyController.favoriteStory);
router.delete("/unfavoriteStory/:id", storyController.unfavoriteStory);

router.delete("/deleteStory/:id", storyController.deleteStory);


module.exports = router;
