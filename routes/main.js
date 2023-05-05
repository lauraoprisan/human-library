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
router.get("/favorites", ensureAuth, storyController.getFavorites);
router.get("/editStory/:id", ensureAuth, storyController.editStory);
router.delete("/updateStory/:id", ensureAuth, storyController.deleteImage);
router.put("/updateStory/:id", ensureAuth, storyController.updateStory);


//Routes for user login/signup
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
