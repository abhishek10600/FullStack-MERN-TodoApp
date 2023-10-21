const User = require("../models/User.js");
const cloudinary = require("cloudinary").v2;
const cookieToken = require("../utils/cookieToken.js");
const mailHelper = require("../utils/emailHelper.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return next(new Error("User with this email does not exists"));
        }
        const forgotPasswordToken = user.getForgetPasswordToken();
        user.save({ validateBeforeSave: false });
        const myUrl = `${req.protocol}://${req.get("host")}/api/v1/users/pasword/reset/${forgotPasswordToken}`;
        const message = `Copy and paste the following link in the url and press enter ${myUrl}`;
        try {
            await mailHelper({
                email: user.email,
                subject: "TodoApp reset email",
                message
            });
            res.status(200).json({
                success: true,
                message: "Reset password email sent to your email"
            })
        } catch (error) {
            user.forgotPasswordToken = undefined;
            user.forgetPasswordExpiry = undefined;
            user.save({ validateBeforeSave: false });
            return next(new Error(error.message));
        }
    } catch (error) {
        return next(new Error(error.message));
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        const token = req.params.token;
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return next(new Error("password and confirm password does not match"));
        }
        const encryptedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
            forgotPasswordToken: encryptedToken,
            forgetPasswordExpiry: { $gt: Date.now() }
        })
        if (!user) {
            return next(new Error("Token is invalid or expired"));
        }
        user.password = password;
        user.forgotPasswordToken = undefined;
        user.forgetPasswordExpiry = undefined;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Your password has been successfully updated. Please login."
        })
    } catch (error) {
        return next(new Error(error.message));
    }
}

exports.changePassword = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("+password");
        if (!user) {
            return next(new Error("User does not exists"));
        }
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        const isOldPasswordValidated = await user.isPasswordValidated(oldPassword);
        if (!isOldPasswordValidated) {
            return next(new Error("Old password is incorrect"));
        }
        if (newPassword !== confirmNewPassword) {
            return next(new Error("new password and confirm new password does not match"));
        }
        user.password = newPassword;
        await user.save();
        cookieToken(user, res);
    } catch (error) {
        return next(new Error(error.message));
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        let user = {};
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(200).json({
                success: false,
                user
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        user = req.user;
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return next(new Error(error.message));
    }
}
