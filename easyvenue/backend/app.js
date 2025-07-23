const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const venueRoutes = require('./routes/venue.route');
const bookingRoutes = require('./routes/booking.route');

const app = express();

// Global Middleware
app.use(express.json());
app.use(cors());

// Health Check
app.get('/', (req, res) => res.send('Venue Booking API is running'));

// Routes
app.use('/api/venues', venueRoutes);
app.use('/api/bookings', bookingRoutes);

// 404 & Error Handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
