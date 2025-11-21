const express = require("express");
const Router = express.Router();
const { register, login, logout } = require("../controller/auth");

// /api/v1/auth
Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/logout").get(logout);

module.exports = Router;
