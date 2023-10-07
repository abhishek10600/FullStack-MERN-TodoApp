const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [40, "Number of characters cannot be more than 40"],
        required: [true, "Name is a required field"],
    },
    email: {
        type: String,
        required: [true, "Email is a required field"],
        unique: true,
        validate: [validator.isEmail, "Please enter enail in correct format"],
    },
    password: {
        type: String,
        minLength: [6, "Password must be atleast 6 characters long"],
        required: [true, "Password is a required field"],
        select: false
    },
    photo: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: "user"
    },
    forgotPasswordToken: {
        type: String,
    },
    forgetPasswordExpiry: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isPasswordValidated = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXPIRESIN
    });
};

userSchema.methods.getForgetPassword = function () {
    const forgotToken = crypto.randomBytes(20).toString("hex");
    this.forgotPasswordToken = crypto.createHash("sha256").update(forgotToken).digest("hex");
    this.forgetPasswordExpiry = Date.now() + 10 * 60 * 1000;
};

module.exports = mongoose.model("Users", userSchema);