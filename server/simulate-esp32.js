const axios = require('axios');
const { io } = require('socket.io-client');

// Configuration
const API_URL = 'http://localhost:5000/api/esp32/location';
const SOCKET_URL = 'http://localhost:5000';
const VEHICLE_ID = '1'; // This should match a vehicle ID in your database
const UPDATE_INTERVAL = 5000; // 5 seconds

// Pune coordinates (starting point)
let currentLat = 18.5204;
let currentLng = 73.8567;
let currentSpeed = 0;

// Connect to socket
const socket = io(SOCKET_URL);

socket.on('connect', () => {
  console.log('Connected to server');
  
  // Start sending location updates
  startLocationUpdates();
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
});

function startLocationUpdates() {
  console.log('Starting location updates simulation...');
  
  // Send updates at regular intervals
  setInterval(() => {
    // Simulate movement by slightly changing coordinates
    currentLat += (Math.random() - 0.5) * 0.001;
    currentLng += (Math.random() - 0.5) * 0.001;
    
    // Simulate speed changes
    if (Math.random() > 0.7) {
      // 30% chance of changing speed
      currentSpeed = Math.floor(Math.random() * 60); // 0-60 km/h
    }
    
    const locationData = {
      vehicleId: VEHICLE_ID,
      latitude: currentLat.toString(),
      longitude: currentLng.toString(),
      speed: currentSpeed.toString()
    };
    
    // Send update via HTTP POST
    axios.post(API_URL, locationData)
      .then(response => {
        console.log(`Location update sent: Lat ${currentLat.toFixed(6)}, Lng ${currentLng.toFixed(6)}, Speed ${currentSpeed} km/h`);
      })
      .catch(error => {
        console.error('Error sending location update:', error.message);
      });
    
  }, UPDATE_INTERVAL);
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('Stopping simulation...');
  socket.disconnect();
  process.exit();
});
