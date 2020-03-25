const User = require("../models/User");

module.exports = (req, res, next) => {
  // Look user id in the datebase
  User.findById(req.session.userId, (error, user) => {
    if (error || !user) {
      return res.redirect("/api/v1/blog");
    }

    next();
  });
};
