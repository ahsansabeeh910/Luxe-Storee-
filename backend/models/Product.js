const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name:String,
  brand:String,
  cat:String,
  price:Number,
  oldPrice:Number,
  rating:Number,
  reviews:Number,
  image:String,
  badge:String,
  desc:String,
  sizes:[String],
  colors:[String]

});

module.exports =
  mongoose.model(
    "Product",
    productSchema
  );