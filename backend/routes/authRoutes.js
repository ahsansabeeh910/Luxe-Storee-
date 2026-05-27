const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req,res)=>{

  const { name,email,password } = req.body;

  const existing = await User.findOne({
    email
  });

  if(existing){

    return res.status(400).json({
      message:"User already exists"
    });
  }

  const hashed = await bcrypt.hash(
    password,
    10
  );

  const user = await User.create({
    name,
    email,
    password:hashed
  });

  res.json(user);
});

router.post("/login", async (req,res)=>{

  const { email,password } = req.body;

  const user = await User.findOne({
    email
  });

  if(!user){

    return res.status(400).json({
      message:"User not found"
    });
  }

  const valid = await bcrypt.compare(
    password,
    user.password
  );

  if(!valid){

    return res.status(400).json({
      message:"Wrong password"
    });
  }

  const token = jwt.sign(
  {
    id:user._id
  },
  "secretkey",
  {
    expiresIn:"7d"
  }
);

  res.json({
    token,
    user
  });
});

module.exports = router;