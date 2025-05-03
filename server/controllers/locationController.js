const Location = require('../models/Location');
const Vehicle = require('../models/Vehicle');

// Record a new location
exports.recordLocation = async (req, res) => {
  try {
    const { vehicleId, position, speed, address } = req.body;
    
    // Check if vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    // Create new location record
    const location = new Location({
      vehicleId,
      position,
      speed: speed || 0,
      address
    });
    
    await location.save();
    
    // Update vehicle's last location
    vehicle.lastLocation = location._id;
    
    // Update vehicle status based on speed
    if (speed > 0) {
      vehicle.status = 'Moving';
      vehicle.ignition = 'On';
    } else {
      vehicle.status = 'Parked';
    }
    
    await vehicle.save();
    
    res.status(201).json(location);
  } catch (error) {
    console.error('Error recording location:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get location history for a vehicle
exports.getLocationHistory = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { startDate, endDate, limit } = req.query;
    
    const query = { vehicleId };
    
    // Add date filters if provided
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    
    // Get locations with pagination
    const locations = await Location.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit) || 100);
    
    res.status(200).json(locations);
  } catch (error) {
    console.error('Error fetching location history:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get the latest location for a vehicle
exports.getLatestLocation = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    
    const location = await Location.findOne({ vehicleId })
      .sort({ timestamp: -1 });
    
    if (!location) {
      return res.status(404).json({ error: 'No location data found for this vehicle' });
    }
    
    res.status(200).json(location);
  } catch (error) {
    console.error('Error fetching latest location:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
