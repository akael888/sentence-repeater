const express = require("express");
const {
  getAllVariables,
  getVariable,
  createVariable,
  deleteVariable,
} = require("../controller//variable");

const Router = express.Router({ mergeParams: true });

Router.route("/").get(getAllVariables).post(createVariable);
Router.route("/:varId").get(getVariable).delete(deleteVariable);

module.exports = Router;
