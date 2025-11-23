import { StatusCodes } from "http-status-codes";

import { ApiError } from "../utils/ApiError.js";

import { authUserValidationSchema } from "../validations/authUser.validation.js";

const validate = (schema, context = "Request", source = "body") => {
    return (req, res, next) => {
        const data = req[source]; // pick correct source

        const { error } = schema.validate(data, { abortEarly: false });

        if (error) {
            console.log(`${context} validation failed`, { errors: error.details });

            return next(
                new ApiError(
                    StatusCodes.BAD_REQUEST,
                    "Validation failed",
                    error.details.map((detail) => detail.message)
                )
            );
        }

        console.log(`${context} validation passed`);
        next();
    };
};

// Specific validators
const validateRegister = validate(authUserValidationSchema, "Register");
const validateLogin = validate(authUserValidationSchema, "Login");

export {
    validateRegister,
    validateLogin
};