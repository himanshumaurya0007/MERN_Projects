import express from "express";
import cors from "cors";

import healthCheckRouter from "./routes/healthCheck.route.js";
import todoRoutes from "./routes/todo.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes
app.use("/api/v1/health-check", healthCheckRouter);
app.use("/api/v1/todos", todoRoutes);

app.use(errorHandler);

export { app };