const express = require("express");
const Router = express.Router();
const jwtMiddleware = require("../Middleware/jwt");
const Controller = require("../Controllers/Cart");

Router.use(jwtMiddleware);

Router.post("/add", Controller.AddToCart);
Router.post("/buy", Controller.Buy);
Router.get("/",Controller.MyCart);
Router.delete("/remove", Controller.RemoveFromCart);

module.exports = Router;
