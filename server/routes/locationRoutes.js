const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// POST record a new location
router.post('/', locationController.recordLocation);

// GET location history for a vehicle
router.get('/vehicle/:vehicleId/history', locationController.getLocationHistory);

// GET latest location for a vehicle
router.get('/vehicle/:vehicleId/latest', locationController.getLatestLocation);

module.exports = router;
