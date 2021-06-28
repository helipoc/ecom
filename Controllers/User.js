const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * Creating new User from the request
 */
module.exports.Register = async (req, res) => {
  let user = await User.find({ username: req.body.username }).count();

  if (user != 0) {
    res.status(500).send("something wrong");
    return;
  }
  let register = await User.create(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(register.password, salt, (err, hash) => {
      register.password = hash;
      register.save();
    });
  });
  res.json({
    msg: "User Created",
  });
};

/**
 * Login and generating a jwt token
 */

module.exports.Login = async (req, res) => {
  let { username, password } = req.body;
  let user = await User.findOne({ username });
  if (user) {
    bcrypt.compare(password, user.password, (err, same) => {
      if (same) {
        user.Token = user.GenerateToken();
        user.save();
        res.json({
          success: true,
          token: user.Token,
        });
        return;
      }

      res.send("Invalid Login");
    });
  } else {
    res.send("Invalid Login");
  }
};

/**
 * Displaying infos of the logged in user
 */

module.exports.Me = function ({ user }, res) {
  user.password = undefined;
  res.json(user);
};

module.exports.Logout = async (req, res) => {
  let user = await User.findById(req.user._id);
  user.Token = "";
  user.save();
  res.json({ success: true });
};

/**
 * Displaying data of someone
 *
 */

module.exports.userInfo = async (req, res) => {
  let { username } = req.params;
  let userInfo = await User.findOne({ username })
    .populate("Items")
    .select("Items username");
  res.json(userInfo || { error: true, msg: "User not found" });
};
