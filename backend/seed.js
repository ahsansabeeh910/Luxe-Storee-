const mongoose = require("mongoose");

const Product =
  require("./models/Product");

const products =
  require("./data/products");

mongoose.connect(
  "mongodb://127.0.0.1:27017/luxeStore"
).then(async ()=>{

  await Product.deleteMany();

  await Product.insertMany(products);

  console.log("Products Inserted");

  process.exit();

});