require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

const app = express();


const userRouter = require("./routes/user.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//custom middlewares
app.use(fileUpload({
    useTempFiles: "true",
    tempFileDir: "/tmp/"
}))


//routes
app.use("/api/v1/users", userRouter);


module.exports = app;