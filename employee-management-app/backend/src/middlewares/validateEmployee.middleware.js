import { StatusCodes } from "http-status-codes";

import { ApiError } from "../utils/ApiError.js";
import { employeeValidationSchema } from "../validations/employee.validation.js";

const validate = (schema, context = "Request", source = "body") => {
    return (req, res, next) => {
        const data = req[source];

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

// Specific validators using the employee schema
const validateCreateEmployee = validate(employeeValidationSchema, "Create Employee");
const validateUpdateEmployee = validate(employeeValidationSchema, "Update Employee", "body");

export {
    validateCreateEmployee,
    validateUpdateEmployee
};
