import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import path from "path";

import { ApiError } from "./utils/ApiError.js";
import { errorHandler } from './middlewares/error.middleware.js';

import healthCheckRouter from "./routes/healthCheck.route.js";
import authUserRouter from "./routes/authUser.route.js"
import employeeRouter from "./routes/employee.route.js"

const app = express();

app.use("/public", express.static(path.resolve("public")));
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    exposedHeaders: ['set-cookie'],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/employee", employeeRouter);

app.use((req, res, next) => {
    next(
        new ApiError(
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND || "Route not found"
        ));
});

app.use(errorHandler);

export { app };