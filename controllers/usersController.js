const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    message: "Registration successful",
    user,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("User does not exist");
  }
});

module.exports = {
  registerUser,
  login,
};
