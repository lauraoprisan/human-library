const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
  },
});

//MongoDB Collection named here - will give lowercase plural of names
module.exports = mongoose.model("Favorite", FavoriteSchema);
