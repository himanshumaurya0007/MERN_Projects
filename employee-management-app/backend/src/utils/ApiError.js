import { StatusCodes, ReasonPhrases } from "http-status-codes";

class ApiError extends Error {
    constructor(
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
        message = ReasonPhrases.INTERNAL_SERVER_ERROR,
        errors = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };