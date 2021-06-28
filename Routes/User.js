const express = require("express");
const Router = express.Router();
const jwtMiddleware = require("../Middleware/jwt");
const Controller = require("../Controllers/User");

Router.post("/register", Controller.Register);
Router.post("/login", Controller.Login);
Router.get("/me", jwtMiddleware, Controller.Me);
Router.get("/logout", jwtMiddleware, Controller.Logout);
Router.get("/:username", Controller.userInfo);

module.exports = Router;
