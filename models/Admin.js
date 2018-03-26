const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new AdminSchema object
// This is similar to a Sequelize model
const AdminSchema = new Schema({
  // `title` is required and of type String
  username: {
    type: String,
    required: true,
    unique: true
  },
  // `link`  is required and of type String
  password: {
    type: String,
    required: true,
    unique: true
  },
  // `link`  is required and of type String
  token: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
const Admin = mongoose.model("Admin", AdminSchema);

// Export the Sermon model
module.exports = Admin;
