const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Venue name is required'],
            trim: true,
            minlength: [3, 'Venue name must be at least 3 characters'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        capacity: {
            type: Number,
            required: [true, 'Capacity is required'],
            min: [1, 'Capacity must be at least 1'],
        },
        pricePerHour: {
            type: Number,
            required: [true, 'Price per hour is required'],
            min: [0, 'Price must be a positive value'],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        unavailableDates: [
            {
                type: Date,
                validate: {
                    validator: (v) => v instanceof Date,
                    message: 'Invalid date format in unavailableDates',
                },
            },
        ],
        createdBy: {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
            // ref: 'User',
            // required: [true, 'Venue must have an owner'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Venue', venueSchema);
