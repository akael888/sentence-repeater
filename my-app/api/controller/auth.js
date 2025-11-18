const { StatusCodes } = require("http-status-codes");
const User = require("../models/user-model");
const {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const register = async (req, res) => {
  // const user = req.body;
  // console.log(user);
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.OK).json({ status: "connected", user: user });
};
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide Username and Password");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("Username not found");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedError("Password is incorrect");
  }

  const token = user.createJWT();

  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: "strict",
    secure: true,
    sameSite: "none",
    maxAge: 3600000,
  });

  res.status(StatusCodes.OK).json({ msg: `Hellow ${user.email}` });
};
const logout = async (req, res) => {
  logutResult = await res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  if (!logutResult) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "Failed Logging Out" });
  }

  res.status(StatusCodes.OK).json({ msg: "Successfully Logged Out!" });
};

module.exports = { register, login, logout };
