const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const storyController = require("../controllers/story");
const { ensureAuth } = require("../middleware/auth");



//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, storyController.getProfile);
router.get("/favorites", storyController.getFavorites);
router.get("/editStory/:id", storyController.editStory);
router.delete("/updateImage/:id", storyController.deleteImage);
router.put("/updateImage/:id", upload.single("file"), storyController.updateImage);
router.put("/updateStory/:id", storyController.updateStory);


//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
