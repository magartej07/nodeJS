const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    profileImage: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);


const User = mongoose.model("User",userSchema)

module.exports = User;