const express = require("express");
const { register, getRegister, login } = require("../controller/auth");

const router = express.Router();

router.route("/register").get(getRegister);

router.route("/users/register").post(register);

router.route("/users/login").post(login);

module.exports = router;
