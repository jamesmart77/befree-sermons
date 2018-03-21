const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const SermonSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  // `link`  is required and of type String
  link: {
    type: String,
    required: true,
    unique: true
  },
  // `link`  is required and of type String
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

// This creates our model from the above schema, using mongoose's model method
const Sermon = mongoose.model("Sermon", SermonSchema);

// Export the Sermon model
module.exports = Sermon;
