const express = require("express");
//const { register, getRegister, login } = require("../controller/auth");
const router = express.Router();
const { postRegister, postLogin, getLogout } = require("../controller/auth");
const { asyncErrorHandler } = require("../middleware/errorHandler");
const auth = require("../middleware/auth");

/* GET /register. */
router.get("/register", (req, res, next) => {
  res.render("register");
});

/* POST /register. */
router.post("/users/register", asyncErrorHandler(postRegister));

/* GET /register. */
router.get("/login", (req, res, next) => {
  res.render("login");
});

/* POST /login. */
router.post("/users/login", asyncErrorHandler(postLogin));

/* GET /logout */
router.get("/logout", auth, getLogout);

module.exports = router;
