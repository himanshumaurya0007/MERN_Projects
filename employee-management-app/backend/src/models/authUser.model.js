import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { errorMessages } from "../utils/errorMessages.js";
import { fields } from "../utils/fields.js";
import {
    emailRegex,
    passwordRegex
} from "../utils/regex.js";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, errorMessages.REQUIRED(fields.email)],
            trim: true,
            lowercase: true,
            unique: true,
            validate: {
                validator: (v) => emailRegex.test(v),
                message: errorMessages.EMAIL_INVALID,
            }
        },
        password: {
            type: String,
            required: [true, errorMessages.REQUIRED(fields.password)],
            minlength: [8, errorMessages.MIN_LENGTH(fields.password, 8)],
            maxlength: [50, errorMessages.MAX_LENGTH(fields.password, 100)],
            trim: true,
            validate: {
                validator: (v) => passwordRegex.test(v),
                message: errorMessages.PASSWORD_INVALID
            }
        },
        refreshToken: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function (next) {
    try {
        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, saltRounds);
        }

        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }
    )
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    )
}

export const User = mongoose.model("User", userSchema);