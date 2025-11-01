const express = require("express");
const Router = express.Router();
const {
  getAllSentence,
  getSentence,
  createSentence,
  editSentence,
  deleteSentece,
} = require("../controller/sentence");

Router.route("/").get(getAllSentence);
Router.route("/:id")
  .get(getSentence)
  .post(createSentence)
  .patch(editSentence)
  .delete(deleteSentece);

module.exports = Router;
