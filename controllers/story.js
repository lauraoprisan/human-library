const cloudinary = require("../middleware/cloudinary");
const Story = require("../models/Story");

module.exports = {
  getProfile: async (req, res) => {
    try {
      //Since we have a session each req contains the logged-in users info: rez.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const stories = await Story.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      console.log(stories)
      res.render("profile.ejs", { stories: stories, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getStory: async (req, res) => {
    try {
      //id parameter comes from the post routes
      //router.get("/:id", ensureAuth,postsController.getPost);
      //http://localhost:3000/post/642f2c9f533b48258c27a452
      //id===642f2c9f533b48258c27a452
      const story = await Story.findById(req.params.id);
      res.render("story.ejs", { story: story, user: req.user});
      console.log(story.user)
      console.log(req.user.id)
    } catch (err) {
      console.log(err);
    }
  },
  createStory: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      //media is stored on cloudinary - the above request responds with url to media and the media id that you will need when deleting content
      await Story.create({
        title: req.body.title,
        textContent: req.body.textContent,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        likes: 0,
        user: req.user.id,
      });
      console.log("Story has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeStory: async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);
  
      // Check if the post has already been liked
      if (story.usersWhoLiked.filter(like => like._id == req.user.id).length>0) { 
        res.redirect(`/story/${req.params.id}`);
      } else{
        story.usersWhoLiked.unshift(req.user.id);
        story.likes++;
        await story.save();
        res.redirect(`/story/${req.params.id}`);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  // likeStory: async (req, res) => {
  //   try {
  //     await Story.findOneAndUpdate(
  //       { _id: req.params.id, usersWhoLiked: { $ne: req.user.id } },
  //       {
  //         $inc: { likes: 1 },
  //         $push: { usersWhoLiked: req.user.id }
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/story/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  deleteStory: async (req, res) => {
    try {
      // Find post by id
      let story = await Story.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(story.cloudinaryId);
      // Delete post from db
      await Story.remove({ _id: req.params.id });
      console.log("Deleted story");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
