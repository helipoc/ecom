const jwt = require("jsonwebtoken");
const User = require("../Models/User");

module.exports = async function (req, res, next) {
  
  try {
    let token = req.headers.authorization.split(" ")[1];
    let id = jwt.verify(token, process.env.SECRET);
    let user = await User.findById(id);
    if (user.Token == token) {
      req.user = user;
      next();
    } else {
      res.send("Token expired ");
    }
  } catch (err) {
    res.send("Invalid Token");
  }
};
