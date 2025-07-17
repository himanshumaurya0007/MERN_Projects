require('dotenv').config();
const mongoose = require('mongoose');
const Venue = require('../models/Venue');
const Booking = require('../models/Booking');

console.log('📦 MONGO_URI:', process.env.MONGO_URI); // Add this for debugging

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ Connected to MongoDB Atlas');

        // Clear existing data
        await Booking.deleteMany();
        await Venue.deleteMany();
        console.log('🧹 Cleared existing Venue and Booking collections');

        // Seed Venues
        const venues = [
            {
                name: "Skyline Banquet Hall",
                location: "Mumbai",
                capacity: 150,
                pricePerHour: 3500,
                createdBy: "64d1c2e1f3a21f9c12345678",
                unavailableDates: ["2025-07-25", "2025-08-01"]
            },
            {
                name: "Sunset Rooftop",
                location: "Pune",
                capacity: 80,
                pricePerHour: 2500,
                createdBy: "64d1c2e1f3a21f9c12345678",
                unavailableDates: ["2025-07-20"]
            },
            {
                name: "Royal Orchid Hall",
                location: "Delhi",
                capacity: 200,
                pricePerHour: 4000,
                createdBy: "64d1c2e1f3a21f9c12345678",
                unavailableDates: []
            },
            {
                name: "Green Garden Venue",
                location: "Nagpur",
                capacity: 120,
                pricePerHour: 3000,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "Ocean Breeze",
                location: "Goa",
                capacity: 100,
                pricePerHour: 5000,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "The Grand Pavilion",
                location: "Bangalore",
                capacity: 180,
                pricePerHour: 4500,
                createdBy: "64d1c2e1f3a21f9c12345678",
                unavailableDates: ["2025-07-21", "2025-07-28"]
            },
            {
                name: "Lotus Convention Center",
                location: "Chennai",
                capacity: 300,
                pricePerHour: 6000,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "Heritage Courtyard",
                location: "Hyderabad",
                capacity: 90,
                pricePerHour: 2800,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "White Pearl Banquet",
                location: "Ahmedabad",
                capacity: 110,
                pricePerHour: 3300,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "Urban Nest",
                location: "Indore",
                capacity: 75,
                pricePerHour: 2100,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "Velvet Lounge",
                location: "Jaipur",
                capacity: 130,
                pricePerHour: 3400,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "Palm Valley Hall",
                location: "Kolkata",
                capacity: 160,
                pricePerHour: 3600,
                createdBy: "64d1c2e1f3a21f9c12345678",
                unavailableDates: ["2025-07-22"]
            },
            {
                name: "Amber Palace",
                location: "Udaipur",
                capacity: 140,
                pricePerHour: 3900,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "Cityscape Terrace",
                location: "Noida",
                capacity: 100,
                pricePerHour: 3200,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "Blue Lagoon Hall",
                location: "Thane",
                capacity: 95,
                pricePerHour: 2700,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "Serene Valley",
                location: "Nashik",
                capacity: 105,
                pricePerHour: 3100,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }, {
                name: "Harmony Hall",
                location: "Surat",
                capacity: 115,
                pricePerHour: 2950,
                createdBy: "64d1c2e1f3a21f9c12345678",
                unavailableDates: ["2025-07-23"]
            },
            {
                name: "Moonlight Venue",
                location: "Lucknow",
                capacity: 125,
                pricePerHour: 3300,
                createdBy: "64d1c2e1f3a21f9c12345678"
            }];
        const insertedVenues = await Venue.insertMany(venues);
        console.log(`🏢 Inserted ${insertedVenues.length} venues`);

        // Seed Bookings
        // const bookings = [
        //     {
        //         venue: insertedVenues[0]._id,
        //         userName: 'Rahul Mehta',
        //         userEmail: 'rahul.mehta@example.com',
        //         bookingDate: new Date('2025-09-01T10:00:00Z'),
        //         hoursBooked: 4,
        //         status: 'confirmed'
        //     },
        //     {
        //         venue: insertedVenues[1]._id,
        //         userName: 'Anjali Kapoor',
        //         userEmail: 'anjali.kapoor@example.com',
        //         bookingDate: new Date('2025-08-05T18:00:00Z'),
        //         hoursBooked: 3,
        //         status: 'confirmed'
        //     },
        //     {
        //         venue: insertedVenues[2]._id,
        //         userName: 'Mohit Verma',
        //         userEmail: 'mohitv23@gmail.com',
        //         bookingDate: new Date('2025-08-10T15:00:00Z'),
        //         hoursBooked: 5,
        //         status: 'cancelled'
        //     },
        //     {
        //         venue: insertedVenues[0]._id,
        //         userName: 'Pooja Sharma',
        //         userEmail: 'pooja.sharma@example.com',
        //         bookingDate: new Date('2025-09-15T12:00:00Z'),
        //         hoursBooked: 2,
        //         status: 'confirmed'
        //     }
        // ];

        // const insertedBookings = await Booking.insertMany(bookings);
        // console.log(`📅 Inserted ${insertedBookings.length} bookings`);

    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
};

seed();
