const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).send("No Token Provided");
  }

  const token = authHead.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, username } = decoded;
    req.user = { userId, username };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).send("Invalid Token");
  }
};

module.exports = authenticationMiddleware;
