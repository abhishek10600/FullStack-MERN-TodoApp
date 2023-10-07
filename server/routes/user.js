const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/user.js");
const { isLoggedIn } = require("../middlewares/user.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isLoggedIn, logout);

module.exports = router;