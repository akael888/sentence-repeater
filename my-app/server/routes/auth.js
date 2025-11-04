const express = require("express");
const Router = express.Router();
const { register, login } = require("../controller/auth");

// /api/v1/auth
Router.route("/register").post(register);
Router.route("/login").post(login);

module.exports = Router;
