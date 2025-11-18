require("dotenv").config();

const express = require("express");
const connectDB = require("./db/connect");
const app = express();
const authRouter = require("./routes/auth");
const sentenceRouter = require("./routes/sentence");
const userRouter = require("./routes/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const notFoundMiddleware = require("./middleware/not-found");
const authenticationMiddleware = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/error-handler");

const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: ["http://localhost:3000", "https://sentence-repeater.vercel.app","https://sentence-repeater-git-features-back-end-akael888s-projects.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/sentence", authenticationMiddleware, sentenceRouter);
app.use("/api/v1/user", authenticationMiddleware, userRouter);

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    console.log("Connecting to Mongo DB...");
    await connectDB(process.env.MONGO_URI);
    console.log("Connected!");
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}..!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
