const express = require("express");
const router = express.Router();

const Post = require("../model/postSchema");

require('dotenv').config();
const jwt =require('jsonwebtoken');
const authMiddleware = require('../middleware/postauth');



router.post("/",authMiddleware,async (req, res) => {

  try {
    
    // const userId = req.user._id;
    const { text, image } = req.body;
    const userId = req.user._id;

    const post = new Post({ text, image ,userId});
    await post.save();


    res.status(201).json({ success: true, message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating post server" });
  }
});






// // Route for getting all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving posts" });
  }
});

//this is for all post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(req.params.id);
    if (deletedPost) {
      res.json({ success: true, message: "Post deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Post not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting post" });
  }
});    
//--------------
router.post("/:postId/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    const liked = post.likes.includes(req.user._id);
    if (liked) {
     
      return res.status(400).json({ error: "Post already liked" });
      
      
    }

    // Add the user's _id to the likes array
    post.likes.push(req.user._id);
    await post.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post('/:postId/comments',authMiddleware,async (req, res) => {
  const { postId } = req.params;
  const { text } = req.body;
  const userId = req.user._id; // Assuming you have implemented user authentication middleware
  const username = req.user.name;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Get the user ID from the logged-in user's session or token
    

    // Create a new comment object
    const newComment = {
      text: text,
      userId: userId,
      username: username,
    };

    // Add the new comment to the post's comments array
    post.comments.push(newComment);

    // Save the updated post
    await post.save();

    // Return a success response
    res.status(200).json({ success: true, message: 'Comment posted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


router.get("/posts",authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ userId });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId }); // Find posts with matching userId
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;








