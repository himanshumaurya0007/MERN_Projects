const express = require('express');
const router = express.Router();
const { addVenue, getAllVenues, getVenueById, updateAvailability, updateVenue } = require('../controllers/venue.controller');
const { createVenueSchema, updateAvailabilitySchema } = require('../validations/venue.validation');
const { validate } = require('../validations/validate');

router.get('/', getAllVenues);
router.post('/', validate(createVenueSchema), addVenue);
router.get('/:id', getVenueById);
router.put('/:id', updateVenue);
router.put('/:id/availability', validate(updateAvailabilitySchema), updateAvailability);

module.exports = router;
