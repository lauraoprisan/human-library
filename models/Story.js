const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    required: false,
  },
  continent: {
    type: String,
    required: false,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  usersWhoLiked:[
    {
      user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    }
],
readBy: {
  type: Number,
  required: true,
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//MongoDB Collection named here - will give lowercase plural of names
module.exports = mongoose.model("Story", StorySchema);
