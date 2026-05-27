const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({

  userId:String,

  items:Array

});

module.exports = mongoose.model(
  "Wishlist",
  wishlistSchema
);