const User = require("../models/User.js");
const cloudinary = require("cloudinary").v2;
const cookieToken = require("../utils/cookieToken.js");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!req.files) {
            return next(new Error("Photo is a required field"));
        }
        if (!name || !email || !password) {
            return next(new Error("Please enter the required fields"));
        }
        let user = await User.findOne({ email });
        if (user) {
            return next(new Error("User with this email already exists!"));
        }
        let file = req.files.photo;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "todoapp"
        })
        user = await User.create({
            name,
            email,
            password,
            photo: {
                public_id: result.public_id,
                secure_url: result.secure_url
            }
        })
        user.password = undefined;
        res.status(201).json({
            success: true,
            message: "Your account has been created. Please login",
            user
        })
    } catch (error) {
        console.log(error.message);
        return next(new Error(error));
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new Error("Email and password cannot be empty!"));
        }
        let user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new Error("Invalid email or password"));
        }
        const isPasswordCorrect = await user.isPasswordValidated(password);
        if (!isPasswordCorrect) {
            return next(new Error("Invalid email or password"));
        }
        cookieToken(user, res);
    } catch (error) {
        console.log(error.message);
        return next(new Error(error.message));
    }
}

exports.logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.status(200).json({
            success: true,
            message: "You have been logged out successfully"
        })
    } catch (error) {
        console.log(error.message);
        return next(new Error(error.message));
    }
}