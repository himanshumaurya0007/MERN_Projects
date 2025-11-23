import mongoose, { Schema } from "mongoose";

import { errorMessages } from "../utils/errorMessages.js";
import { fields } from "../utils/fields.js";

const departmentSchema = new Schema({
    name: {
        type: String,
        required: [true, errorMessages.REQUIRED(fields.department)],
        trim: true,
        unique: true,
    }
});

export const Department = mongoose.model("Department", departmentSchema);
