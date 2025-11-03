const { StatusCodes } = require("http-status-codes");
const User = require("../models/user-model");

const register = async (req, res) => {
  // const user = req.body;
  // console.log(user);
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.OK).json({ status: "connected", user: user });
};
const login = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "login" });
};

module.exports = { register, login };
