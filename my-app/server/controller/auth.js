const { StatusCodes } = require("http-status-codes");
const User = require("../models/user-model");

const register = async (req, res) => {
  // const user = req.body;
  // console.log(user);
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.OK).json({ status: "connected", user: user });
};
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide Username and Password" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Username not found" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Password Incorrect" });
  }

  const token = user.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ msg: `Hellow ${user.email}`, token: token });
};

module.exports = { register, login };
