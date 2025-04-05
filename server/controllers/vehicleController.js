const Vehicle = require('../models/Vehicle');
const Location = require('../models/Location');

// Get all vehicles
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('lastLocation');
    res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single vehicle by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate('lastLocation');
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new vehicle
exports.createVehicle = async (req, res) => {
  try {
    const { name, registrationNumber, owner, deviceId } = req.body;
    
    // Check if vehicle with registration number already exists
    const existingVehicle = await Vehicle.findOne({ registrationNumber });
    if (existingVehicle) {
      return res.status(400).json({ error: 'Vehicle with this registration number already exists' });
    }
    
    const vehicle = new Vehicle({
      name,
      registrationNumber,
      owner,
      deviceId
    });
    
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    console.error('Error creating vehicle:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update vehicle status
exports.updateVehicleStatus = async (req, res) => {
  try {
    const { status, ignition } = req.body;
    
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    if (status) vehicle.status = status;
    if (ignition) vehicle.ignition = ignition;
    
    await vehicle.save();
    res.status(200).json(vehicle);
  } catch (error) {
    console.error('Error updating vehicle status:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get vehicle statistics
exports.getVehicleStats = async (req, res) => {
  try {
    const vehicleId = req.params.id;
    
    // Get today's date (start of day)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get start of last week
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);
    
    // Get locations for today
    const todayLocations = await Location.find({
      vehicleId,
      timestamp: { $gte: today }
    }).sort({ timestamp: 1 });
    
    // Get locations for last week
    const weekLocations = await Location.find({
      vehicleId,
      timestamp: { $gte: lastWeekStart }
    }).sort({ timestamp: 1 });
    
    // Calculate statistics
    const stats = {
      speed: {
        current: 0,
        average: 0,
        maximum: 0,
        minimum: 0
      },
      distance: {
        today: 0,
        week: 0
      }
    };
    
    // Calculate speed stats
    if (todayLocations.length > 0) {
      const speeds = todayLocations.map(loc => loc.speed).filter(speed => speed > 0);
      
      if (speeds.length > 0) {
        stats.speed.current = todayLocations[todayLocations.length - 1].speed;
        stats.speed.average = Math.round(speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length);
        stats.speed.maximum = Math.max(...speeds);
        stats.speed.minimum = Math.min(...speeds);
      }
    }
    
    // Calculate distance (simplified calculation)
    // For a more accurate calculation, you would use the Haversine formula
    if (todayLocations.length > 1) {
      for (let i = 1; i < todayLocations.length; i++) {
        const prevLoc = todayLocations[i - 1];
        const currLoc = todayLocations[i];
        
        const distance = calculateDistance(
          prevLoc.position.lat, prevLoc.position.lng,
          currLoc.position.lat, currLoc.position.lng
        );
        
        stats.distance.today += distance;
      }
    }
    
    if (weekLocations.length > 1) {
      for (let i = 1; i < weekLocations.length; i++) {
        const prevLoc = weekLocations[i - 1];
        const currLoc = weekLocations[i];
        
        const distance = calculateDistance(
          prevLoc.position.lat, prevLoc.position.lng,
          currLoc.position.lat, currLoc.position.lng
        );
        
        stats.distance.week += distance;
      }
    }
    
    // Convert to kilometers and round
    stats.distance.today = Math.round(stats.distance.today / 1000);
    stats.distance.week = Math.round(stats.distance.week / 1000);
    
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error calculating vehicle statistics:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return R * c; // Distance in meters
}
