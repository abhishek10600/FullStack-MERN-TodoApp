const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return next(new Error("Loggin to use this feature"));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new Error(error.message));
    }
}