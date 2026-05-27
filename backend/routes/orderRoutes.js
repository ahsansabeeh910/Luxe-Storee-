const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

const authMiddleware =
  require("../middleware/authMiddleware");

/* CREATE ORDER */

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const { items, totalPrice } = req.body;

      const newOrder = new Order({
        user: req.user.id,
        items,
        totalPrice
      });

      await newOrder.save();

      res.status(201).json({
        message: "Order placed",
        order: newOrder
      });

    } catch(error){

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

/* GET USER ORDERS */

router.get(
  "/myorders",
  authMiddleware,
  async (req, res) => {

    try {

      const orders = await Order.find({
        user: req.user.id
      });

      res.json(orders);

    } catch(error){

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });

    }

  }
);

module.exports = router;