
const express = require("express");
const cors = require("cors");

const connectDB = require("./db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const Product = require("./models/Product");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

/* ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

/* CART MEMORY */

let cart = [];

/* GET CART */

app.get("/api/cart", (req, res) => {
  res.json(cart);
});

/* ADD TO CART */

app.post("/api/cart", async (req, res) => {

  try {

    const { id, qty } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    const existing = cart.find(
      c => c._id.toString() === id
    );

    if (existing) {

      existing.qty += qty;

    } else {

      cart.push({
        ...product.toObject(),
        qty
      });

    }

    res.json(cart);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* REMOVE FROM CART */

app.delete("/api/cart/:id", (req, res) => {

  cart = cart.filter(
    c => c._id.toString() !== req.params.id
  );

  res.json(cart);

});

/* START SERVER */

app.listen(5000, () => {
  console.log("Server running on 5000");
});