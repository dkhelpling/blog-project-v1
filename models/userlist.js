let mongoose = require("mongoose");

// creating schema for userlist
var Schema = mongoose.Schema;

let userlistSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  emailName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("userlist", userlistSchema);
