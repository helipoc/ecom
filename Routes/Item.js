const express = require("express");
const Router = express.Router();
const jwtMiddleware = require("../Middleware/jwt");
const Controller = require("../Controllers/Item");

Router.use(jwtMiddleware);

Router.get("/", Controller.Items);
Router.get("/:id", Controller.Items);
Router.post("/add", Controller.addItem);
Router.delete("/:id", Controller.DeleteItem);
Router.post("/search", Controller.SearchItem);
Router.post("/myitems", Controller.myItems);

module.exports = Router;
