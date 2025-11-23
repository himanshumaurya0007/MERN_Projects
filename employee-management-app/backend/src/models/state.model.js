import mongoose, { Schema } from "mongoose";

import { errorMessages } from "../utils/errorMessages.js";
import { fields } from "../utils/fields.js";

const stateSchema = new Schema({
    name: {
        type: String,
        required: [true, errorMessages.REQUIRED(fields.name)],
        trim: true,
    },
});

export const State = mongoose.model("State", stateSchema);