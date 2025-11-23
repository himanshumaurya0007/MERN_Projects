import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err instanceof ApiError
        ? err.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR;

    // Final structured error logging
    console.error("Error caught by middleware", {
        statusCode,
        message: err.message,
        stack: err.stack,
    });

    // Build standardized response
    const response = new ApiResponse(
        statusCode,
        null,
        err instanceof ApiError ? err.message : ReasonPhrases.INTERNAL_SERVER_ERROR
    );

    // Include validation / field errors if present
    if (err instanceof ApiError && err.errors?.length) {
        response.errors = err.errors;
    }

    // Only attach stack in development
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    return res.status(statusCode).json(response);
};