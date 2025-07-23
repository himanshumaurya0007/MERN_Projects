const { StatusCodes } = require('http-status-codes');
const Venue = require('../models/Venue');

// @desc    Create a new venue
// @route   POST /api/venues
exports.addVenue = async (req, res) => {
    try {
        const venue = await Venue.create(req.body);
        res.status(StatusCodes.CREATED).json({
            message: 'Venue created successfully',
            venue,
        });
    } catch (error) {
        console.error('Error creating venue:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to create venue',
            error: error.message,
        });
    }
};

// @desc    Get all venues
// @route   GET /api/venues
exports.getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.find({ isActive: true }).sort({ createdAt: -1 });
        res.status(StatusCodes.OK).json(venues);
    } catch (error) {
        console.error('Error fetching venues:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to fetch venues',
            error: error.message,
        });
    }
};

// @desc    Get a venue by ID
// @route   GET /api/venues/:id
exports.getVenueById = async (req, res) => {
    try {
        const { id } = req.params;

        const venue = await Venue.findById(id);

        if (!venue || !venue.isActive) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Venue not found' });
        }

        res.status(StatusCodes.OK).json(venue);
    } catch (error) {
        console.error('Error fetching venue by ID:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to fetch venue',
            error: error.message,
        });
    }
};

// @desc    Update venue details
// @route   PUT /api/venues/:id
exports.updateVenue = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedVenue = await Venue.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedVenue) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Venue not found' });
        }

        res.status(StatusCodes.OK).json({
            message: 'Venue updated successfully',
            venue: updatedVenue,
        });
    } catch (error) {
        console.error('Error updating venue:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to update venue',
            error: error.message,
        });
    }
};

// @desc    Block/Unblock venue dates
// @route   PUT /api/venues/:id/availability
exports.updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { blockDates, unblockDates } = req.body;

        const venue = await Venue.findById(id);
        if (!venue) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'Venue not found' });
        }

        // Convert all dates to strings (toDateString) for consistent comparison
        const unavailableSet = new Set(venue.unavailableDates.map(date => new Date(date).toDateString()));

        // Block new dates
        blockDates.forEach(date => {
            const d = new Date(date).toDateString();
            if (!unavailableSet.has(d)) unavailableSet.add(d);
        });

        // Unblock specified dates
        unblockDates.forEach(date => {
            const d = new Date(date).toDateString();
            unavailableSet.delete(d);
        });

        // Reconstruct unavailableDates array
        venue.unavailableDates = Array.from(unavailableSet).map(dateStr => new Date(dateStr));
        await venue.save();

        res.status(StatusCodes.OK).json({
            message: 'Availability updated successfully',
            unavailableDates: venue.unavailableDates,
        });
    } catch (error) {
        console.error('Error updating availability:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to update availability',
            error: error.message,
        });
    }
};
