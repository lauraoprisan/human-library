const cloudinary = require("../middleware/cloudinary");
const Story = require("../models/Story");
const Favorite = require("../models/Favorite");

module.exports = {
  getProfile: async (req, res) => {
    try {
      //Since we have a session each req contains the logged-in users info: rez.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const story = await Story.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("profile.ejs", { story: story[0], user: req.user, editStory:false, errorMessage:false });

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
      const story = await Story.findById(req.params.id).populate('user', 'userName').lean();;

      res.render("story.ejs", { story: story, user: req.user});
      console.log(story.user._id)
      console.log(story.user)
      console.log("id" +  req.user.id)
      console.log("_id" +  req.user._id)
    } catch (err) {
      console.log(err);
    }
  },
  viewedStory: async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);

      if (!story.usersWhoRead.some(userId => userId._id == req.user.id)) {
        story.usersWhoRead.push(req.user.id);
        story.readBy++;
        await story.save();
      }

    } catch (err) {
      console.log(err);
    }
  },
  createStory: async (req, res) => {
    try {
      // Check if required fields are present
      if (!req.body.title || !req.body.textContent || !req.file) {
        // Set error message and render the same page again
        const errorMessage = 'Please provide a title, description and image!';
        res.render("profile.ejs", {story:false, user:req.user, errorMessage: errorMessage, editStory:false, });
      }
      // /Check if required fields are present
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      //media is stored on cloudinary - the above request responds with url to media and the media id that you will need when deleting content
      await Story.create({
        title: req.body.title,
        textContent: req.body.textContent,
        image: result.secure_url,
        country: req.body.country,
        continent: req.body.continent,
        cloudinaryId: result.public_id,
        likes: 0,
        readBy: 0,
        user: req.user.id,
      });
    
      console.log("Story has been added!");
      console.log(req.body);
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeStory: async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);

      // Adding like whether the user already liked it or not
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
  unlikeStory: async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);

      // Adding like whether the user already liked it or not
      if (story.usersWhoLiked.filter(like => like._id == req.user.id).length === 0) { 
        res.redirect(`/story/${req.params.id}`);
        console.log("Story has not been liked");
      } else{
        const removeIndex = story.usersWhoLiked.map(like => like._id).indexOf(req.user.id);
        story.likes.splice(removeIndex,1);
        await story.save();
        res.redirect(`/story/${req.params.id}`);
        console.log("User disliked the story");
      }

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  getFavorites: async (req, res) => {
    try {
      //Since we have a session each req contains the logged-in users info: rez.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user

      const stories = await Favorite.find({ user: req.user.id }).populate("story");
      const validFavorites = stories.filter(fav => fav.story);
      //Sending post data from mongodb and user data to ejs template
      res.render("favorites.ejs", { stories: validFavorites, user: req.user });
      console.log(stories)
    } catch (err) {
      console.log(err);
    }
  },
  favoriteStory: async (req, res) => {
    try {
      await Favorite.create({
        user: req.user.id,
        story: req.params.id,
      });
      console.log("Favorite story has been added!");
      res.redirect(`/story/${req.params.id}`);
    } catch (err) {
      console.log(err);
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
      console.log(" delete function")
      // Find post by id
      let story = await Story.findById({ _id: req.params.id });
      console.log("param id" + req.params.id)
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(story.cloudinaryId);
      // Delete post from db
      await Story.remove({ _id: req.params.id });
      console.log("Deleted story");
      res.redirect("/profile");
    } catch (err) {
      console.log(" error delete function")
      res.redirect("/profile");
    }
  },
  editStory: async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);
      res.render("profile.ejs", { story: story, user: req.user, editStory:true, errorMessage:false});
    } catch (err) {
      console.log(err);
    }
  },
  deleteImage: async (req, res) => {
    try {
      // Find post by id
      let story = await Story.findById({ _id: req.params.id });
      if(file){
         // Delete image from cloudinary
        await cloudinary.uploader.destroy(story.cloudinaryId);
      }
      console.log("Deleted image in cloudinary");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  updateStory: async (req, res) => {
    try {

      // Check if required fields are present
       if (!req.body.newTitle || !req.body.newTextContent) {
        const oldStory = await Story.findById(req.params.id).populate('user', 'userName').lean();;
        // Set error message and render the same page again
        const errorMessage = 'Please provide a title and a description!';
        res.render("profile.ejs", {story:oldStory, user:req.user, errorMessage: errorMessage, editStory:true, });
      }
      // /Check if required fields are present

      let story = await Story.findOneAndUpdate(
        { 
            _id: req.params.id
        }, 
        {
          $set: {
            title: req.body.newTitle, 
            textContent: req.body.newTextContent,
            country: req.body.newCountry,
            continent: req.body.newContinent,
   
          },

        },
        {
          new:true,
        });

        // console.log("req")
        // console.log(req)
        // console.log("req bodyyyy")
        // console.log(req.body);
        console.log("new continent")
        console.log(req.body.newContinent);
        res.render("profile.ejs", {story: story, user: req.user, editStory:false});
    
    } catch (err) {
       console.log(err);
    }
  },
};
