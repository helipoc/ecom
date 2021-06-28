const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Items: [{ type: mongoose.Types.ObjectId, ref: "Item" }],
  Cart: [{ type: mongoose.Types.ObjectId, ref: "Item" }],
  Balance: {
    type: Number,
    default: 0,
  },
  Token: {
    type: String,
    default: "",
  },
});

User.methods.GenerateToken = function () {
  let jwtToken = jwt.sign(this._id.toString(), process.env.SECRET);
  this.Token = jwtToken;

  return jwtToken;
};

module.exports = mongoose.model("User", User, "users");
