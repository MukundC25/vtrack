const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// GET all vehicles
router.get('/', vehicleController.getVehicles);

// GET a single vehicle
router.get('/:id', vehicleController.getVehicleById);

// POST create a new vehicle
router.post('/', vehicleController.createVehicle);

// PUT update vehicle status
router.put('/:id/status', vehicleController.updateVehicleStatus);

// GET vehicle statistics
router.get('/:id/stats', vehicleController.getVehicleStats);

module.exports = router;
