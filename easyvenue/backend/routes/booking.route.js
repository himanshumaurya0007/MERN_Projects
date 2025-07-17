const express = require('express');
const router = express.Router();
const { createBooking, getRecentBookings } = require('../controllers/booking.controller');
const { createBookingSchema } = require('../validations/booking.validation');
const { validate } = require('../validations/validate');

router.post('/', validate(createBookingSchema), createBooking);
router.get('/recent', getRecentBookings);

module.exports = router;
