const { StatusCodes } = require('http-status-codes');
const Booking = require('../models/Booking');
const Venue = require('../models/Venue');

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
    try {
        const { venueId, userName, userEmail, bookingDate, hoursBooked } = req.body;

        // 1. Check if the venue exists
        const venue = await Venue.findById(venueId);
        if (!venue) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Venue not found' });
        }

        // 2. Check if the venue is unavailable on the booking date
        const dateStr = new Date(bookingDate).toDateString();
        const isUnavailable = venue.unavailableDates.some(date => {
            return new Date(date).toDateString() === dateStr;
        });

        if (isUnavailable) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Venue is not available on the selected date',
            });
        }

        // 3. Check for already confirmed bookings on the same date
        const alreadyBooked = await Booking.findOne({
            venue: venueId,
            bookingDate: new Date(bookingDate),
            status: 'confirmed',
        });

        if (alreadyBooked) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Venue is already booked on this date',
            });
        }

        // 4. Calculate total cost
        if (typeof venue.pricePerHour !== 'number') {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Venue pricing is unavailable. Please contact admin.',
            });
        }

        const totalCost = venue.pricePerHour * hoursBooked;

        // 5. Create the booking
        let booking;
        
        try {
            booking = await Booking.create({
                venue: venueId,
                userName,
                userEmail,
                bookingDate,
                hoursBooked,
                totalCost,
            });
        } catch (err) {
            console.error('Booking save error:', err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Failed to save booking. Please try again.',
                details: err.message,
            });
        }

        // 6. Add date to venue's unavailableDates array
        venue.unavailableDates.push(new Date(bookingDate));
        await venue.save();

        return res.status(StatusCodes.CREATED).json({
            message: 'Booking confirmed successfully',
            booking,
        });
    } catch (err) {
        console.error('Booking creation error:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to create booking',
            details: err.message,
        });
    }
};

// @desc    Get latest 10 bookings
// @route   GET /api/bookings/recent
exports.getRecentBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('venue', 'name location') // Populate venue details
            .exec();

        return res.status(StatusCodes.OK).json(bookings);
    } catch (err) {
        console.error('Error fetching recent bookings:', err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to fetch recent bookings',
            error: err.message,
        });
    }
};
