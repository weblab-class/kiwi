const mongoose = require("mongoose");


const IconsSchema = new mongoose.Schema({
  // Ask from Stella
  creatorId: String,
	icon_id: Number,
	state: Number,	


});


// compile model from schema
module.exports = mongoose.model("icons", IconsSchema);
