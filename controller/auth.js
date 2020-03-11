const User = require("../models/User");
const bcrypt = require("bcrypt");

// @desc Login page
// @route Get /api/v1/auth/register
// @access Public
exports.getRegister = (req, res, next) => {
  res.render("register");
};

// @desc Register user
// @route Post /api/v1/users/register
// @access Public
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = User.create(req.body, (error, user) => {
    if (!username || !email || !password) {
      return res.redirect("/api/v1/auth/register");
    }

    const token = user.getSignedJwtToken();

    //res.redirect("/api/v1/blog");
    res
      .status(200)

      .redirect("/api/v1/blog");
  });
};

// @desc Login user
// @route Get /api/v1/auth/login
// @access Public

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate the email and password
  if (!email || !password) {
    return res.redirect("/api/v1/auth/login");
  }

  // Check for the user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    //return res.status(404).redirect("/api/auth/login");
    res.redirect("/api/v1/auth/login");
  }

  // Check password match
  const isMatch = await user.matchPassword(password);

  if (!isMatch || isMatch === null || !user) {
    res.redirect("/api/v1/auth/login");
  }

  // Create the token
  //const token = user.getSignedJwtToken();

  res.redirect("/api/v1/blog");
};
