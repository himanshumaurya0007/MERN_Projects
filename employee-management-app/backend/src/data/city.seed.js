// PS C:\Users\ADMIN\Desktop\Himanshu Maurya\MERN_Task\backend> node ./src/data/city.seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config("../../.env");

import { City } from "../models/city.model.js";
import { State } from "../models/state.model.js";

const cityData = [
    { name: "Mumbai", stateName: "Maharashtra" },
    { name: "Pune", stateName: "Maharashtra" },
    { name: "Bengaluru", stateName: "Karnataka" },
    { name: "Mysuru", stateName: "Karnataka" },
    { name: "Chennai", stateName: "Tamil Nadu" },
    { name: "Coimbatore", stateName: "Tamil Nadu" },
    { name: "Lucknow", stateName: "Uttar Pradesh" },
    { name: "Noida", stateName: "Uttar Pradesh" },
    { name: "Delhi", stateName: "Delhi" },
    { name: "Kolkata", stateName: "West Bengal" },

    // Additional 20 cities
    { name: "Ahmedabad", stateName: "Gujarat" },
    { name: "Surat", stateName: "Gujarat" },
    { name: "Jaipur", stateName: "Rajasthan" },
    { name: "Jodhpur", stateName: "Rajasthan" },
    { name: "Bhopal", stateName: "Madhya Pradesh" },
    { name: "Indore", stateName: "Madhya Pradesh" },
    { name: "Patna", stateName: "Bihar" },
    { name: "Gaya", stateName: "Bihar" },
    { name: "Hyderabad", stateName: "Telangana" },
    { name: "Warangal", stateName: "Telangana" },
    { name: "Chandigarh", stateName: "Chandigarh" },
    { name: "Panaji", stateName: "Goa" },
    { name: "Thiruvananthapuram", stateName: "Kerala" },
    { name: "Kochi", stateName: "Kerala" },
    { name: "Dehradun", stateName: "Uttarakhand" },
    { name: "Haridwar", stateName: "Uttarakhand" },
    { name: "Shimla", stateName: "Himachal Pradesh" },
    { name: "Amritsar", stateName: "Punjab" },
    { name: "Jammu", stateName: "Jammu and Kashmir" },
    { name: "Ranchi", stateName: "Jharkhand" },
];

const seedCities = async () => {
    try {
        // Step 1: Check for required env variables
        if (!process.env.MONGO_URI || !process.env.DB_NAME) {
            throw new Error("Missing MONGO_URI or DB_NAME in .env");
        }

        // Step 2: Connect to MongoDB
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`);
        console.log("Connected to MongoDB.");

        // Step 3: Clear existing cities
        await City.deleteMany({});
        console.log("Existing cities cleared.");

        const citiesToInsert = [];

        for (const { name, stateName } of cityData) {
            // Step 1: Search `states.name` in the state collection
            const matchedState = await State.findOne({ name: stateName });

            // Step 2: Check if found and match
            if (!matchedState || matchedState.name !== stateName) {
                console.warn(`⚠️  State "${stateName}" not found. Skipping city "${name}".`);
                continue;
            }

            // Step 3: Extract ObjectId of the matched state
            const stateObjectId = matchedState._id;

            // Step 4: Push city with `state` field = ObjectId
            citiesToInsert.push({
                name,
                state: stateObjectId
            });
        }

        const result = await City.insertMany(citiesToInsert);
        console.log(`Seeded ${result.length} cities.`);

        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedCities();
