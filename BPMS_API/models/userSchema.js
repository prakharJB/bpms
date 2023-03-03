const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // require: true,
    },
    firstName: {
      type: String,
      // require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      // required: true,
      max: 50,
      unique: true,
    },
    token: {
      type: String,
    },
    password: {
      type: String,
      // require: true,
      min: 6,
    },
    dateofbirth: {
      type: String,
      max: 20,
    },
    languages: {
      type: Array,
      default: [],
    },
    lastActive: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
