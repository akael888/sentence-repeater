const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authenticationMiddleware = async (req, res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No Token Provided" });
  }

  const token = authHead.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = User.findById(decoded.userId);
    // const { userId, username } = decoded;
    // req.user = { userId, username };

    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({msg:"User not found!"})
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid Token" });
  }
};

module.exports = authenticationMiddleware;
