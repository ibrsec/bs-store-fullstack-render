"use strict";

const validateToken = async (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const { User } = require("../models/userModel");
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401);
    throw new Error("Unauthorized - token is missing!");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Unauthorized - token is missing!");
  }

  let myUser = {};
  let userQuery = {};
  jwt.verify(token, process.env.ACCESSTOKEN_SECRETKEY, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("Unauthorized - invalid token!");
    }
    userQuery = { _id: decoded?.user?.id, email: decoded?.user?.email };

    res.userDecoded = {
      user_id: decoded?.user.id,
      user_email: decoded?.user?.email,
      accessToken: token, 
    };
  });

  const user = await User.findOne(userQuery);
  if (!user) {
    res.status(401);
    throw new Error("Unauthorized - User not found! -> invalid token");
  }
console.log(user);
  res.userDecoded.isAdmin = user?.isAdmin;


  next();
};

module.exports = validateToken;
