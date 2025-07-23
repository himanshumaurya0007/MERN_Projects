const Joi = require('joi');

const createVenueSchema = Joi.object({
    name: Joi.string().min(3).required(),
    location: Joi.string().required(),
    capacity: Joi.number().min(1).required(),
    pricePerHour: Joi.number().min(0).required(),
    createdBy: Joi.string().required(),
});

const updateAvailabilitySchema = Joi.object({
    blockDates: Joi.array().items(Joi.date()).default([]),
    unblockDates: Joi.array().items(Joi.date()).default([]),
});

module.exports = {
    createVenueSchema,
    updateAvailabilitySchema,
};