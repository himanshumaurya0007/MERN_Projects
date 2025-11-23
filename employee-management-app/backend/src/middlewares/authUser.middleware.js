import jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

import { User } from "../models/authUser.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // Extract token from "Authorization" header
        let token;
        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // Extract token from httpOnly cookie
        if (!token && req.cookies?.accessToken) {
            token = req.cookies.accessToken;
        }

        if (!token) {
            console.log("No token provided in header or cookie");
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED
            );
        }

        // Verify token
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (err) {
            console.error("JWT verification failed", { error: err.message });
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED
            );
        }

        // Fetch user from DB
        const user = await User.findById(decodedToken._id).select(
            // "-password -refreshToken"
            "-password"
        );

        if (!user) {
            console.log("User not found for decodedToken JWT", { userId: decodedToken._id });
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED
            );
        }

        // Attach user to request object
        req.user = user;

        console.log("JWT verified successfully", { userId: user._id });
        next();

    } catch (error) {
        // next(error);
        throw new ApiError(
            error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
            error.errors || []
        );
    }
});

export { verifyJWT };