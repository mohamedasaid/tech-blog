const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");

// @desc Login page
// @route Get /api/v1/auth/register
// @access Public
// exports.getRegister = (req, res, next) => {
//   res.render("register");
// };

// @desc Register user
// @route Post /api/v1/users/register
// @access Public
module.exports = {
  // Register the user
  async postRegister(req, res, next) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      // console.log(Object.keys(username.errors));
      return res.redirect("/api/v1/auth/register");
    }

    const newUser = await User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    await User.register(newUser, req.body.password);
    res.redirect("/api/v1/auth/login");
  },

  // // Post /login
  // postLogin(req, res, next) {
  //   const { email, password } = req.body;
  //   // Validate the email and password
  //   if (!email || !password) {
  //     return res.redirect("/api/v1/auth/login");
  //   }

  //   passport.authenticate("local", {
  //     failureRedirect: "/api/v1/auth/login",
  //     failureFlash: true
  //   }),
  //     function(req, res, next) {
  //       res.redirect("/");
  //     };
  // },

  async postLogin(req, res, next) {
    const { email, password } = req.body;
    // try to find the user
    await User.findOne({ email }, (error, user) => {
      if (user) {
        // compare passwords.
        bcrypt.compare(password, user.password, (error, same) => {
          if (same) {
            req.session.userId = user._id;
            res.redirect("/api/v1/blog");
          } else {
            res.redirect("/api/v1/auth/login");
          }
        });
      } else {
        return res.redirect("/api/v1/auth/login");
      }
    });
  },
  // postLogin(req, res, next) {
  //   const { email, password } = req.body;

  //   // Validate the email and password
  //   if (!email || !password) {
  //     return res.redirect("/api/v1/auth/login");
  //   }
  //   passport.authenticate("local", {
  //     successRedirect: "/api/v1/auth/login",
  //     failureRedirect: "/api/v1/auth/login"
  //   })(req, res, next);
  // },

  // GET /logout
  getLogout(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect("/api/v1/blog");
  }
};

// @desc Login user
// @route Get /api/v1/auth/login
// @access Public
