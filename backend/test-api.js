/**
 * This is a simple script to test the API endpoints
 * Run it with: node test-api.js
 */

const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';

// Test device data
const testDevice = {
  deviceId: 'ESP32-TEST-001',
  name: 'Test Vehicle',
  type: 'car'
};

// Test location data
const testLocation = {
  latitude: 12.9716,
  longitude: 77.5946,
  altitude: 920,
  speed: 25,
  heading: 90
};

// Test telemetry data
const testTelemetry = {
  batteryLevel: 85,
  signalStrength: 70,
  status: 'active'
};

// Register a device
async function registerDevice() {
  try {
    const response = await fetch(`${API_URL}/devices/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testDevice)
    });
    
    const data = await response.json();
    console.log('Device Registration Response:', data);
    return data;
  } catch (error) {
    console.error('Error registering device:', error);
  }
}

// Update device location
async function updateLocation() {
  try {
    const response = await fetch(`${API_URL}/devices/${testDevice.deviceId}/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testLocation)
    });
    
    const data = await response.json();
    console.log('Location Update Response:', data);
    return data;
  } catch (error) {
    console.error('Error updating location:', error);
  }
}

// Update device telemetry
async function updateTelemetry() {
  try {
    const response = await fetch(`${API_URL}/devices/${testDevice.deviceId}/telemetry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testTelemetry)
    });
    
    const data = await response.json();
    console.log('Telemetry Update Response:', data);
    return data;
  } catch (error) {
    console.error('Error updating telemetry:', error);
  }
}

// Get all devices
async function getAllDevices() {
  try {
    const response = await fetch(`${API_URL}/devices`);
    const data = await response.json();
    console.log('All Devices Response:', data);
    return data;
  } catch (error) {
    console.error('Error getting devices:', error);
  }
}

// Run tests
async function runTests() {
  console.log('Starting API tests...');
  
  // Register device
  await registerDevice();
  
  // Update location
  await updateLocation();
  
  // Update telemetry
  await updateTelemetry();
  
  // Get all devices
  await getAllDevices();
  
  console.log('API tests completed');
}

// Uncomment to run tests
// runTests();

console.log(`
To test the API, start the server with 'npm run dev' and then run this script.
You can also use tools like Postman or curl to test the endpoints manually.

Example curl commands:

# Register a device
curl -X POST http://localhost:5000/api/devices/register \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(testDevice)}'

# Update location
curl -X POST http://localhost:5000/api/devices/${testDevice.deviceId}/location \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(testLocation)}'

# Update telemetry
curl -X POST http://localhost:5000/api/devices/${testDevice.deviceId}/telemetry \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(testTelemetry)}'

# Get all devices
curl http://localhost:5000/api/devices
`);
