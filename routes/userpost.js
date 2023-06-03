const express = require("express");
const router = express.Router();
const Post = require("../model/postSchema");
const { User } = require("../model/user");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/postauth');

// router.get("/", authMiddleware, async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const posts = await Post.find({ userId });
//     res.json(posts);
//   } catch (error) {
//     console.error(error);
//     console.log(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId }).exec();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
  
  ////------
        
  
  
  module.exports = router;