const User = require("../models/User");
const bcrypt = require("bcrypt");
// @desc Login user
// @route Get /api/v1/auth/login
// @access Public
exports.getLogin = (req, res, next) => {
  res.render("login");
};

// @desc Login user
// @route POST /api/v1/auth/loging
// @access Public

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  // try to find the user
  User.findOne({ email }, (error, user) => {
    if (user) {
      // compare passwords.
      bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
        if (isMatch) {
          //req.session.userId = user._id
          res.redirect("/api/v1/blog");
        } else {
          res.redirect("/api/v1/auth/login");
        }
      });
    } else {
      res.redirect("/api/v1/auth/login");
    }
  });
};
