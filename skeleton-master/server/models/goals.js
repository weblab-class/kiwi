const mongoose = require("mongoose");


const GoalsSchema = new mongoose.Schema({
  // Ask from Stella
  creatorId: String,
  goalId: Number,
  goalContent: String,
  frequency: Number,
  minimum: Number,
  achievement: Number,

});


// compile model from schema
module.exports = mongoose.model("goals", GoalsSchema);
