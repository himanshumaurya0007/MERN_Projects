const Joi = require('joi');

const createBookingSchema = Joi.object({
    venueId: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid venue ID format',
            'any.required': 'Venue ID is required',
        }),

    userName: Joi.string()
        .trim()
        .min(3)
        .required()
        .messages({
            'string.base': 'User name must be a string',
            'string.min': 'User name must be at least 3 characters',
            'any.required': 'User name is required',
        }),

    userEmail: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Email format is invalid',
            'any.required': 'User email is required',
        }),

    bookingDate: Joi.date()
        .greater('now')
        .required()
        .messages({
            'date.base': 'Booking date must be a valid date',
            'date.greater': 'Booking date must be a future date',
            'any.required': 'Booking date is required',
        }),

    hoursBooked: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            'number.base': 'Booking duration must be a number',
            'number.min': 'Booking duration must be at least 1 hour',
            'any.required': 'Booking duration is required',
        }),
});

module.exports = {
    createBookingSchema,
};
