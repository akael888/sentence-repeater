const { StatusCodes } = require("http-status-codes");
const User = require("../models/user-model");
const {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} = require("../errors");

const getUserName = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (!user) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `Do not found any user with ${req.user.userId}` });
  }
  res
    .status(StatusCodes.OK)
    .json({ username: user.username, msg: "Sucessfully Get the Username" });
};

module.exports = { getUserName };
