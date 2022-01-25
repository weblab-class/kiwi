const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  bio: String,
  interests: Array,
  image: String,
  friends: Array,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
