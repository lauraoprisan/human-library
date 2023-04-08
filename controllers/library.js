const Story = require("../models/Story");

module.exports = {
    getStories: async (req, res) => {
    try {
      const stories = await Story.find().sort({ createdAt: "desc" }).populate('user', 'userName').lean(); // populate user field with username only
      res.render("library.ejs", { stories: stories});
    } catch (err) {
      console.log(err);
    }
  },
};
