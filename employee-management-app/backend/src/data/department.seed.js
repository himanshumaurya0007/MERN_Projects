// PS C:\Users\ADMIN\Desktop\Himanshu Maurya\MERN_Task\backend> node ./src/data/department.seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config("../../.env");

import { Department } from "../models/department.model.js";

const departments = [
    { name: "Human Resources" },
    { name: "Finance" },
    { name: "Engineering" },
    { name: "Marketing" },
    { name: "Sales" },
    { name: "Customer Support" },
    { name: "IT" },
    { name: "Legal" },
    { name: "Operations" },
    { name: "Product Management" },
];

const seedDepartments = async () => {
    try {
        if (!process.env.MONGO_URI || !process.env.DB_NAME) {
            throw new Error("Missing MONGO_URI or DB_NAME in .env");
        }

        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("Connected to MongoDB.");

        // Clear existing departments
        await Department.deleteMany({});
        console.log("Existing departments cleared.");

        // Insert new departments
        const result = await Department.insertMany(departments);
        console.log(`Seeded ${result.length} departments.`);

        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedDepartments();
