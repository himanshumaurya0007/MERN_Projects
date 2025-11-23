import mongoose, { Schema } from "mongoose";

import { errorMessages } from "../utils/errorMessages.js";
import { fields } from "../utils/fields.js";
import { GENDER } from "../constants.js";
import {
    emailRegex,
    phoneRegex,
    pinCodeRegex
} from "../utils/regex.js";

const employeeSchema = new Schema(
    {
        profilePic: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: [true, errorMessages.REQUIRED(fields.name)],
            minlength: [3, errorMessages.MIN_LENGTH(fields.name, 3)],
            maxlength: [50, errorMessages.MAX_LENGTH(fields.name, 50)],
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, errorMessages.REQUIRED(fields.email)],
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: (v) => emailRegex.test(v),
                message: errorMessages.EMAIL_INVALID,
            },
        },
        phone: {
            type: String,
            required: [true, errorMessages.REQUIRED(fields.phone)],
            validate: {
                validator: (v) => phoneRegex.test(v),
                message: errorMessages.PHONE_INVALID,
            },
        },
        gender: {
            type: String,
            required: [true, errorMessages.REQUIRED(fields.gender)],
            trim: true,
            uppercase: true,
            enum: {
                values: GENDER,
                message: `Invalid ${fields.gender}`,
            },
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: "Department",
            required: [true, errorMessages.REQUIRED(fields.department)],
        },
        state: {
            type: Schema.Types.ObjectId,
            ref: "State",
            required: [true, errorMessages.REQUIRED(fields.state)],
        },
        city: {
            type: Schema.Types.ObjectId,
            ref: "City",
            required: [true, errorMessages.REQUIRED(fields.city)],
        },
        pincode: {
            type: String,
            required: [true, errorMessages.REQUIRED(fields.pincode)],
            trim: true,
            validate: {
                validator: (v) => pinCodeRegex.test(v),
                message: errorMessages.PINCODE_INVALID,
            },
        },
        address: {
            type: String,
            required: [true, errorMessages.REQUIRED(fields.address)],
            minlength: [3, errorMessages.MIN_LENGTH(fields.address, 3)],
            maxlength: [200, errorMessages.MAX_LENGTH(fields.address, 200)],
            trim: true,
        },
        isPermanent: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Employee = mongoose.model("Employee", employeeSchema);
