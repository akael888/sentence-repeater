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
Router.route("/").get(getAllSentence);
Router.route("/:id")
  .get(getSentence)
  .post(createSentence)
  .patch(editSentence)
  .delete(deleteSentece);

  // /api/v1/sentence
Router.use("/:sentenceId/variable", variableRoute);

module.exports = Router;
