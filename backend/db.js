const mongoose = require("mongoose");

async function connectDB(){

  try{

    await mongoose.connect(
      "mongodb://127.0.0.1:27017/luxeStore"
    );

    console.log("MongoDB Connected");

  }catch(error){

    console.log(error);

    process.exit(1);
  }
}

module.exports = connectDB;