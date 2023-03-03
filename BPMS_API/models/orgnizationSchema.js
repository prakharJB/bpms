const mongoose = require("mongoose");

const OrgnizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // require: true,
    },
    email:{
        type:String
    },
    industry: {
      type: String,
      // require: true,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      // require: true,
      min: 6,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orgnization", OrgnizationSchema);
