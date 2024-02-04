const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const authProtect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer")) {
    throw new Error("Authentication Failed");
  }
  let token = header.split(" ")[1];

  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_STR);
    const user = await User.findById(decodedToken.id);
    console.log(decodedToken, user);
    req.user = user;
    next();
  } catch (error) {
    throw new Error("Authentication Failed");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email });
  if (user.role !== "admin") {
    throw new Error("You are not an admin");
  }
  next();
});

module.exports = {
  authProtect,
};
