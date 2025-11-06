const express = require("express");
const Router = express.Router();
const variableRoute = require("../routes/variable");
const {
  getAllSentence,
  getSentence,
  createSentence,
  editSentence,
  deleteSentece,
} = require("../controller/sentence");

// /api/v1/sentence
Router.route("/").get(getAllSentence).post(createSentence);
Router.route("/:id")
  .get(getSentence)
  .patch(editSentence)
  .delete(deleteSentece);

// /api/v1/sentence
Router.use("/:sentenceId/variable", variableRoute);

module.exports = Router;
