const mongoose = require("mongoose");
const Item = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  Owner: {
    type: String,
  },
  Price: {
    type: Number,
    required: true,
    min: 1,
  },
  Image: {
    type: String,
  },
  Desc: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Item", Item, "items");
