import Joi from "joi";

import { fields } from "../utils/fields.js";
import {
    emailRegex,
    passwordRegex
} from "../utils/regex.js";
import { errorMessages } from "../utils/errorMessages.js";

const authUserValidationSchema = Joi.object({
    email: Joi.string()
        .pattern(emailRegex)
        .trim()
        .lowercase()
        .required()
        .messages({
            "string.pattern.base": errorMessages.EMAIL_INVALID,
            "string.empty": errorMessages.REQUIRED(fields.email),
        }),

    password: Joi.string()
        .pattern(passwordRegex)
        .min(8)
        .max(100)
        .trim()
        .required()
        .messages({
            "string.pattern.base": errorMessages.PASSWORD_INVALID,
            "string.empty": errorMessages.REQUIRED(fields.password),
            "string.min": errorMessages.MIN_LENGTH(fields.password, 8),
            "string.max": errorMessages.MAX_LENGTH(fields.password, 100),
        }),

    refreshToken: Joi.string()
        .default(null)
        .optional(),
});

export { authUserValidationSchema };