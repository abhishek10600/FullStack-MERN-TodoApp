const express = require("express");
const router = express.Router();
const { register, login, logout, forgotPassword, resetPassword, changePassword, getProfile } = require("../controllers/user.js");
const { isLoggedIn } = require("../middlewares/user.js");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isLoggedIn, logout);
router.route("/forgotpassword").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/password/update").post(isLoggedIn, changePassword);
router.route("/getProfile").get(getProfile);

module.exports = router;