// PS C:\Users\ADMIN\Desktop\Himanshu Maurya\MERN_Task\backend> node ./src/data/state.seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config("../../.env");

import { State } from "../models/state.model.js";

const states = [
    { name: "Andhra Pradesh" },
    { name: "Arunachal Pradesh" },
    { name: "Assam" },
    { name: "Bihar" },
    { name: "Chhattisgarh" },
    { name: "Goa" },
    { name: "Gujarat" },
    { name: "Haryana" },
    { name: "Himachal Pradesh" },
    { name: "Jharkhand" },
    { name: "Karnataka" },
    { name: "Kerala" },
    { name: "Madhya Pradesh" },
    { name: "Maharashtra" },
    { name: "Manipur" },
    { name: "Meghalaya" },
    { name: "Mizoram" },
    { name: "Nagaland" },
    { name: "Odisha" },
    { name: "Punjab" },
    { name: "Rajasthan" },
    { name: "Sikkim" },
    { name: "Tamil Nadu" },
    { name: "Telangana" },
    { name: "Tripura" },
    { name: "Uttar Pradesh" },
    { name: "Uttarakhand" },
    { name: "West Bengal" },
    { name: "Andaman and Nicobar Islands" },
    { name: "Chandigarh" },
    { name: "Dadra and Nagar Haveli and Daman and Diu" },
    { name: "Delhi" },
    { name: "Jammu and Kashmir" },
    { name: "Ladakh" },
    { name: "Lakshadweep" },
    { name: "Puducherry" }
];

const seedStates = async () => {
    try {
        if (!process.env.MONGO_URI || !process.env.DB_NAME) {
            throw new Error("Missing MONGO_URI or DB_NAME in .env");
        }

        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("Connected to MongoDB.");

        // Clear existing states
        await State.deleteMany({});
        console.log("Existing states cleared.");

        // Insert new states
        const result = await State.insertMany(states);
        console.log(`Seeded ${result.length} states.`);

        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedStates();
