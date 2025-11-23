import { StatusCodes, ReasonPhrases } from "http-status-codes";
import dotenv from "dotenv";
dotenv.config("../../.env");

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { fields } from "../utils/fields.js";

import { User } from "../models/authUser.model.js";
import jwt from 'jsonwebtoken';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === `production`,
    sameSite: `lax`,
    // sameSite: `strict`,
}

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                ReasonPhrases.NOT_FOUND,
                [`User with id ${userId} not found`]
            );
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        console.log(`Tokens generated successfully for userId: ${userId}`);

        return { accessToken, refreshToken };

    } catch (error) {
        console.error(`Error generating tokens for userId: ${userId}: ${error.message}`, { stack: error.stack });

        throw new ApiError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            ReasonPhrases.INTERNAL_SERVER_ERROR,
            [error.message]
        );
    }
};

const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ApiError(
                StatusCodes.CONFLICT,
                ReasonPhrases.CONFLICT,
                [`${fields.email} already exists`]
            );
        }

        const user = await User.create({
            email,
            password
        });

        console.log(`New user registered: ${user.email} (id: ${user._id})`);

        return res
            .status(StatusCodes.CREATED)
            .json(
                new ApiResponse(
                    StatusCodes.CREATED,
                    {
                        user: {
                            _id: user._id,
                            email: user.email
                        },
                    },
                    `User registered successfully`
                ));

    } catch (error) {
        console.error(`User registered failed: ${error.message}`, { stack: error.stack })

        next(
            error instanceof ApiError
                ? error
                : new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    [error.message]
                ));
    }
});

const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email }).select("+password");

        if (!existingUser) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                ReasonPhrases.NOT_FOUND,
                [`User not found for email: ${existingUser.email}`]
            );
        }

        const isPasswordValid = await existingUser.comparePassword(password);

        if (!isPasswordValid) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                ["Invalid credentials"]
            );
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(existingUser._id);

        console.log(`User logged in: ${existingUser.email}`);

        return res
            .status(StatusCodes.CREATED)
            .cookie(`accessToken`, accessToken, cookieOptions)
            .cookie(`refreshToken`, refreshToken, cookieOptions)
            .json(
                new ApiResponse(
                    StatusCodes.OK,
                    {
                        user: {
                            _id: existingUser._id,
                            email: existingUser.email
                        },
                        accessToken,
                        refreshToken
                    },
                    `Login successful.`
                ));

    } catch (error) {
        console.error(`User login failed: ${error.message}`, { stack: error.stack });

        next(
            error instanceof ApiError
                ? error
                : new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    [error.message]
                ));
    }
});

const logoutUser = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                [`User not authenticated`]
            );
        }

        await User.findByIdAndUpdate(
            userId,
            { $unset: { refreshToken: "" } },
            { new: true }
        );

        console.log(`User logged out: ${userId}`);

        return res
            .status(StatusCodes.OK)
            .clearCookie("accessToken", cookieOptions)
            .clearCookie("refreshToken", cookieOptions)
            .json(
                new ApiResponse(
                    StatusCodes.OK,
                    null,
                    "Logout successful."
                ));

    } catch (error) {
        console.error(`User logout failed: ${error.message}`, { stack: error.stack });
        next(
            error instanceof ApiError
                ? error
                : new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    [error.message]
                ));
    }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies?.refreshToken;

        if (!incomingRefreshToken) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                `Refresh token missing`
            );
        }

        // Verify the token
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken._id);
        if (!user) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                `Invalid refresh token - User not found`
            );
        }

        // Generate new tokens
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res
            .status(StatusCodes.OK)
            .cookie(`accessToken`, accessToken, cookieOptions)
            .cookie(`refreshToken`, refreshToken, cookieOptions)
            .json(
                new ApiResponse(
                    StatusCodes.OK,
                    {
                        accessToken,
                        refreshToken
                    },
                    `Access token refreshed successfully`
                ));

    } catch (error) {
        throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            error.message || "Invalid refresh token"
        );
    }
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            throw new ApiError(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                ["User not authenticated"]
            );
        }

        const user = await User.findById(userId).select("email _id");

        if (!user) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                ReasonPhrases.NOT_FOUND,
                ["User not found"]
            );
        }

        return res.status(StatusCodes.OK).json(
            new ApiResponse(StatusCodes.OK, {
                user: {
                    _id: user._id,
                    email: user.email,
                }
            }, "User fetched successfully")
        );

    } catch (error) {
        console.error(`Error fetching current user: ${error.message}`, { stack: error.stack });

        next(
            error instanceof ApiError
                ? error
                : new ApiError(
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    ReasonPhrases.INTERNAL_SERVER_ERROR,
                    [error.message]
                )
        );
    }
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
};