import { Router } from "express";

import {
    validateRegister,
    validateLogin
} from "../middlewares/validateAuthUser.middleware.js";
import { verifyJWT } from "../middlewares/authUser.middleware.js";

import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser
} from "../controllers/authUser.controller.js";

const router = Router();

router
    .route('/register')
    .post(
        validateRegister,
        registerUser
    );

router
    .route('/login')
    .post(
        validateLogin,
        loginUser
    );

router
    .route('/logout')
    .post(
        verifyJWT,
        logoutUser
    );

router
    .route('/refresh-token')
    .post(
        refreshAccessToken
    );

router
    .route('/me')
    .get(
        verifyJWT,
        getCurrentUser
    );

export default router;