const express = require("express");
const Router = express.Router();
const UserRegister = require("../controllers/auth/UserRegister");
const UserLogin = require("../controllers/auth/UserLogin");

Router.post("/register", UserRegister);
Router.post("/login", UserLogin);

module.exports = Router;