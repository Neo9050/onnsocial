const express = require("express");
const router = express.Router();

const { User } = require("../model/user");
require('dotenv').config();
const jwt = require('jsonwebtoken');




const authMiddleware = async (req, res, next) => {
  try {
    // var token = req.headers.authorization.split(' ')[1];
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("midd :",token)
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    console.log(decoded);
    console.log("user",user);

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      
      res.status(401).send({ error: "Invalid token. Please authenticate." });
      console.log(error);
    } else if (error instanceof jwt.TokenExpiredError) {
      res.status(401).send({ error: "Token expired. Please authenticate again." });
    } else {
      console.log(error)
      res.status(401).send({ error: "User not found. Please authenticate." });
    }
  }
};




module.exports = authMiddleware;


