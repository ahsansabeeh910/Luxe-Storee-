const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  items:[
    {
      name:String,
      price:Number,
      qty:Number,
      emoji:String
    }
  ],

  totalPrice:Number,

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );