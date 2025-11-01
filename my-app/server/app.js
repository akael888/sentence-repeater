const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const sentenceRouter = require("./routes/sentence");
const port = process.env.PORT || 8000;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/sentence", sentenceRouter);

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
