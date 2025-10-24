const { StatusCodes } = require("http-status-codes");

const register = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Register" });
};
const login = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "login" });
};

module.exports = { register, login };
