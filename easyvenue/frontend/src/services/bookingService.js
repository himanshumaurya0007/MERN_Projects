// src/services/bookingService.js
import apiClient from './apiClient';

// Create a booking
export const createBooking = (bookingData) =>
    apiClient.post('/bookings', bookingData).then(res => res.data);

// Get 10 recent bookings (Admin)
export const getRecentBookings = () =>
    apiClient.get('/bookings/recent');
