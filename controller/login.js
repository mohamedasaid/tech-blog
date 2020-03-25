const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = (req, res) => {
  const { email, password } = req.body;
  // try to find the user
  User.findOne({ email }, (error, user) => {
    if (user) {
      // compare passwords.
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          //req.session.userId = user._id
          res.redirect("/api/v1/blog");
        } else {
          res.redirect("/api/v1/auth/login");
        }
      });
    } else {
      return res.redirect("/api/v1/auth/login");
    }
  });
};
