const cloudinary = require("../middleware/cloudinary");
const Story = require("../models/Story");
const Favorite = require("../models/Favorite");
const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      //Since we have a session each req contains the logged-in users info: rez.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const story = await Story.find({ user: req.user.id });

      let comments = false;
      if(story.length!=0){
         comments = await Comment.find({story:story[0]._id}).populate('user').sort({ createdAt: "desc" }).lean().exec();
      }
      
     
      
      //Sending post data from mongodb and user data to ejs template
      res.render("profile.ejs", { story: story[0],comments:comments, user: req.user, editStory:false, errorMessage:false, imgError:false });

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
      
      const story = await Story.findById(req.params.id).populate('user', 'userName').lean();
      const comments = await Comment.find({story: req.params.id}).populate('user').sort({ createdAt: "desc" }).lean().exec();

      let isFav = false
      let isLiked = false

      

      //if the user is logged in
      if(req.user){
      
        //check if the user has the story in favorites
        const favorite = await Favorite.find({user: req.user.id, story:req.params.id});
        if(favorite.length != 0){
          isFav = true
        }
  
        //check if the user liked the story
        if (story.usersWhoLiked.filter(like => like._id == req.user.id).length>0) { 
          isLiked = true
        }


          //viewedStory
        // if (!story.usersWhoRead.some(userId => userId._id == req.user.id)) {
        //   story.usersWhoRead.push(req.user.id);
        //   story.readBy++;
        //   console.log(story.readBy)
        //   console.log(story)
        //   // await story.save()
 
        // }
      }
     

      res.render("story.ejs", { story: story, comments:comments, user: req.user, isFav:isFav, isLiked:isLiked});
  

      
    } catch (err) {
      console.log("getstory problem");
      console.log(err);
    }
  },
  // viewedStory: async (req, res, story) => {
  //   try {

  //     if (!story.usersWhoRead.some(userId => userId._id == req.user.id)) {
  //       story.usersWhoRead.push(req.user.id);
  //       story.readBy++;
  //       await story.save();
  //     }

  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  createStory: async (req, res) => {
    try {
      // Check if required fields are present
      if (!req.body.title || !req.body.textContent || !req.file) {
        // Set error message and render the same page again
        const errorMessage = 'Please provide a title, description and image!';
        res.render("profile.ejs", {story:false, user:req.user, errorMessage: errorMessage, editStory:false, imgError:false});
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
      // console.log(req.body);
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeStory: async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);

      // Adding like whether the user already liked it or not
      if (story.usersWhoLiked.filter(user => user._id == req.user.id).length>0) { 
        res.redirect(`/story/${req.params.id}`);
        console.log("Already liked")
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

      //deleting the user from the usersWhoLiked array
      story.usersWhoLiked.forEach((user,index,arr) =>{
        if(user._id == req.user.id){
          arr.splice(index,1)
        }
      })

      story.likes--;
      await story.save();
      res.redirect(`/story/${req.params.id}`);


      // Adding like whether the user already liked it or not
      // if (story.usersWhoLiked.filter(like => like._id == req.user.id).length === 0) { 
      //   res.redirect(`/story/${req.params.id}`);
      //   console.log("Story has not been liked");
      // } else{
      //   const removeIndex = story.usersWhoLiked.map(like => like._id).indexOf(req.user.id);
      //   story.likes.splice(removeIndex,1);
      //   await story.save();
      //   res.redirect(`/story/${req.params.id}`);
      //   console.log("User disliked the story");
      // }

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
  getFavorites: async (req, res) => {
    try {

      //Since we have a session each req contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user

      const stories = await Favorite.find({user: req.user.id }).populate("story");
      
      const validFavorites = stories.map(fav => fav.story);

      console.log(validFavorites)
      //Sending post data from mongodb and user data to ejs template
      res.render("favorites.ejs", { stories: validFavorites, user: req.user });

    } catch (err) {
      console.log(err);
    }
  },
  favoriteStory: async (req, res) => {
    try {

      const favorite = await Favorite.find({user: req.user.id, story:req.params.id});
      
      if(favorite.length != 0){
        console.log("The story is already in favorites")
        res.redirect(`/story/${req.params.id}`);
      } else{

        await Favorite.create({
          user: req.user.id,
          story: req.params.id,
        });
  
        console.log("Favorite story has been added!");
        res.redirect(`/story/${req.params.id}`);
      }

      
    } catch (err) {
      console.log(err);
    }
  },

  unfavoriteStory: async (req, res) => {
    try {
 
      await Favorite.remove({user: req.user.id, story:req.params.id});
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
  
      // Find post by id
      const story = await Story.findById({ _id: req.params.id });

      // Delete image from cloudinary
      await cloudinary.uploader.destroy(story.cloudinaryId);

      // Delete favorites associated with the story from database
      await Favorite.deleteMany({story: req.params.id});

      // Delete comments of the story from database
      await Comment.deleteMany({story: req.params.id})

      // Delete post from db
      await Story.deleteOne({ _id: req.params.id });
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
      res.render("profile.ejs", { story: story, user: req.user, editStory:true, errorMessage:false, imgError:false});
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
  updateImage: async (req, res) => {
    try {
      
        const result = await cloudinary.uploader.upload(req.file.path);
      let story = await Story.findOneAndUpdate(
        { 
            _id: req.params.id
        }, 
        {
          $set: {
            image: result.secure_url,
            cloudinaryId: result.public_id, 
          },

        },
        {
          new:true,
        });

       
  
        res.render("profile.ejs", {story: story,  user: req.user, editStory:true, errorMessage: false,imgError:false});

    } catch (err) {
       console.log(err);
       console.log("Img not provided")

        try{
          const imgError = 'Please choose an image!';
          const story = await Story.findById(req.params.id)

          res.render("profile.ejs", {story: story, user: req.user, editStory:true, errorMessage: false,imgError:imgError});

      } catch(err){
        console.log(err)
      }
      
    }
  
},
  updateStory: async (req, res) => {
    try {

      // Check if required fields are present
       if (!req.body.newTitle || !req.body.newTextContent) {
        const oldStory = await Story.findById(req.params.id).populate('user', 'userName').lean();;
        // Set error message and render the same page again
        const errorMessage = 'You cannot have the title or story empty!';
        res.render("profile.ejs", {story:oldStory, user:req.user, errorMessage: errorMessage, editStory:true, imgError:false });
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

        // res.render("profile.ejs", {story: story, user: req.user, editStory:false, imgError:false});
        res.redirect("/profile");
    
    } catch (err) {
       console.log(err);
    }
  },
};
