const Story = require("../models/Story");
const Favorite = require("../models/Favorite");
const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
       
      await Comment.create({
        comment: req.body.comment,
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
        console.log(comment)
        if (comment.usersWhoLiked.filter(user => user._id == req.user.id).length>0) { 
            res.redirect(`/story/${req.params.storyId}`);
            console.log("Comment already liked")
        } else{
            comment.usersWhoLiked.unshift(req.user.id);
            comment.likes++;
            await comment.save();
            res.redirect(`/story/${req.params.storyId}`);
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
  },
};
