const express = require("express");
const { createTask, getAllTasksOfLoggedInUser, updateTask, deleteTask } = require("../controllers/task.js");
const { isLoggedIn } = require("../middlewares/user.js");
const router = express.Router();

router.route("/createTask").post(isLoggedIn, createTask);
router.route("/all").get(isLoggedIn, getAllTasksOfLoggedInUser);
router.route("/update/:taskId").put(isLoggedIn, updateTask);
router.route("/delete/:taskId").delete(isLoggedIn, deleteTask);

module.exports = router;