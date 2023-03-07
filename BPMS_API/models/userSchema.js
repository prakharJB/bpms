const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      // required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      // require: true,
      min: 6,
    },
    lastActive: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
