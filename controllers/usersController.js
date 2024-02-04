const generateToken = require("../config/token");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateRefreshToken = require("../config/refreshToken");

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  //console.log(cookie);
  if (!cookie.refreshToken) throw new Error("No refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  //console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("Refresh token is missing");
  jwt.verify(refreshToken, process.env.SECRET_JWT, (err, decoded) => {
    if (err || user.id !== decoded.id)
      throw new Error("There is something wrong with the refresh token");
    const accessToken = generateToken(user._id);
    res.json({ accessToken });
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    message: "Registration successful",
    user,
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //check if user exists
  console.log(email, password);
  const user = await User.findOne({ email });
  const token = generateToken(user._id);
  if (user && (await user.isPasswordCorrect(password))) {
    const refreshToken = await generateRefreshToken(user._id);
    // const updatedUser = await User.findByIdAndUpdate(
    //   user._id,
    //   { refreshToken: refreshToken },
    //   { new: true }
    // );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      token,
      user,
    });
  } else {
    throw new Error("Invalid credetials");
  }
});

module.exports = {
  registerUser,
  login,
};
