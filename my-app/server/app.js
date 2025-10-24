const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const port = process.env.PORT || 8000;

app.use("/api/v1/auth", authRouter);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`app is listening to port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
