import mongoose, { Schema } from "mongoose";

import { errorMessages } from "../utils/errorMessages.js";
import { fields } from "../utils/fields.js";

const citySchema = new Schema({
    name: {
        type: String,
        required: [true, errorMessages.REQUIRED(fields.city)],
        trim: true,
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: "State",
        required: [true, errorMessages.REQUIRED(fields.state)],
        trim: true,
    }
});

export const City = mongoose.model("City", citySchema);
