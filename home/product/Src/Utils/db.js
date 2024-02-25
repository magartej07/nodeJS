const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Success to connect db");
  } catch (error) {
    console.error("error", error.message);
  }
};

module.exports = connectToDb;
