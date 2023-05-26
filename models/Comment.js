const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
  likes: {
    type: Number,
    required: true,
  },
  usersWhoLiked:[
    {
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
