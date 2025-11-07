const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.msg || "Something went wrong, please try again later..",
  };
  console.log("error");
  console.log(err);
  console.log(err.name);

  if (err.name === "ValidationError") {
    // Kalau data yang dimasukan belum sesuai validatornya
    customError.msg = Object.values(err.errors)
      .map((items) => {
        items.message;
      })
      .join(",");
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    // Casting Error
    customError.msg = `This ${err.value} not found!`;
    customError.statusCode = 404;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicated Value for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
