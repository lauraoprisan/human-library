const Story = require("../models/Story");
const Favorite = require("../models/Favorite");
const Comment = require("../models/Comment");

module.exports = {
  createCommentFromProfile: async (req, res) => {
    try {
       
      await Comment.create({
        comment: req.body.comment.trim(),
        user: req.user.id,
        story: req.params.id,
        likes: 0,

      });
    
  
      console.log("Story has been added!");
      // console.log(req.body);
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },
  createCommentFromStory: async (req, res) => {
    try {
       
      await Comment.create({
        comment: req.body.comment.trim(),
        user: req.user.id,
        story: req.params.id,
        likes: 0,

      });
    
  
      console.log("Story has been added!");
      // console.log(req.body);
      res.redirect(`/story/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      
      // Find comment by id
      console.log("hei from deletecomment")

      console.log("param id of comment" + req.params.commentId)
      console.log("param id of story" + req.params.storyId)
      
      // Delete post from db
      await Comment.findOneAndDelete({ _id: req.params.commentId });
      console.log("Deleted comment");
      res.redirect(`/story/${req.params.storyId}`);
    } catch (err) {
    
        console.log(" error delete comment function")
        console.log(err)
        res.redirect(`/story/${req.params.storyId}`);
    }
  },
  likeComment: async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
      
        // Adding like whether the user already liked it or not
     
        comment.usersWhoLiked.unshift(req.user.id);
        comment.likes++;
        await comment.save();

        
        console.log("from like comment")
        console.log("comment")
        console.log(comment)

        res.redirect(`/story/${req.params.storyId}`);
        


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
  },
  unlikeComment: async (req, res) => {
    try {
        console.log("hei")
        const comment = await Comment.findById(req.params.commentId);
      

        //deleting the user from the usersWhoLiked array
        comment.usersWhoLiked.forEach((user,index,arr) =>{
            if(user._id == req.user.id){
            arr.splice(index,1)
            }
        })

        comment.likes--;
        await comment.save();

        console.log("from unlike comment")
        console.log("comment")
        console.log(comment)
      
    
        res.redirect(`/story/${req.params.storyId}`);
        


    } catch (err) {
        console.error(err);
        // res.status(500).send("Server Error");
    }
  },
};
