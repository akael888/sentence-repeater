const express = require("express");
const Router = express.Router();
const { getUserName } = require("../controller/user");

// /api/v1/auth
Router.route("/username").get(getUserName);

module.exports = Router;
