import { StatusCodes, ReasonPhrases } from "http-status-codes";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const healthCheck = asyncHandler(async (req, res) => {
    try {
        const serviceStatus = { status: ReasonPhrases.OK };

        if (!serviceStatus) {
            throw new ApiError(
                StatusCodes.SERVICE_UNAVAILABLE,
                "Health check failed",
                ["Dependent service unavailable"]
            );
        }

        console.log("Health check successful");

        res
            .status(StatusCodes.OK)
            .json(
                new ApiResponse(
                    StatusCodes.OK,
                    serviceStatus,
                    "Health check successful"
                ));

    } catch (error) {
        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
            [],
            error.stack
        );
    }
});

export { healthCheck };