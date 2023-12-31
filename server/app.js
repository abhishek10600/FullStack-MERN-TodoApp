require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const CORS = require("cors");

const app = express();


const userRouter = require("./routes/user.js");
const taskRouter = require("./routes/task.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(CORS({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

//custom middlewares
app.use(fileUpload({
    useTempFiles: "true",
    tempFileDir: "/tmp/"
}))


//routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);


module.exports = app;