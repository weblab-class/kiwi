const mongoose = require("mongoose");

//define a story schema for the database
const StorySchema = new mongoose.Schema({
  creatorId: String,
  creatorName: String,
  creatorImage: String,
  storyId: String,
  storyTitle: String,
  storyImage: String,
  storyContent: String,
  storyLocation: String,
  storyTags: Array,
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);
