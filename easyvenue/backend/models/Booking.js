const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        venue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Venue',
            required: [true, 'Booking must be linked to a venue'],
        },
        userName: {
            type: String,
            required: [true, 'User name is required'],
            trim: true,
        },
        userEmail: {
            type: String,
            required: [true, 'User email is required'],
            match: [/\S+@\S+\.\S+/, 'Email format is invalid'],
            lowercase: true,
        },
        bookingDate: {
            type: Date,
            required: [true, 'Booking date is required'],
            validate: {
                validator: (date) => date instanceof Date && date > new Date(),
                message: 'Booking date must be a valid future date',
            },
        },
        hoursBooked: {
            type: Number,
            required: [true, 'Booking duration is required'],
            min: [1, 'Booking duration must be at least 1 hour'],
        },
        status: {
            type: String,
            enum: ['confirmed', 'cancelled'],
            default: 'confirmed',
        },
        totalCost: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
