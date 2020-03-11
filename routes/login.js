const express = require("express");

const { getLogin, loginUser, userLogin } = require("../controller/login");

const router = express.Router();

router.route("/login").get(getLogin);
//router.route("/login").post(loginUser);

module.exports = router;
