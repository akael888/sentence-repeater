require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const authRouter = require("./routes/auth");
const sentenceRouter = require("./routes/sentence");

const notFoundMiddleware = require("./middleware/not-found");
const authenticationMiddleware = require("./middleware/authentication");

const port = process.env.PORT || 8000;

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/sentence", authenticationMiddleware, sentenceRouter);

//middleware
app.use(notFoundMiddleware);

const start = async () => {
  try {
    console.log(`Connecting to Mongo DB...`);
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app is listening to port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
