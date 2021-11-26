const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
