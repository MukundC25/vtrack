const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const vehicleRoutes = require('./routes/vehicleRoutes');
const locationRoutes = require('./routes/locationRoutes');

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vtrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/locations', locationRoutes);

// Socket.io connection for real-time updates
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Handle location updates from ESP32 devices
  socket.on('location_update', (data) => {
    console.log('Location update received:', data);
    // Broadcast the location update to all connected clients
    io.emit('vehicle_location', data);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// ESP32 endpoint to receive location data
app.post('/api/esp32/location', (req, res) => {
  const { vehicleId, latitude, longitude, speed } = req.body;
  
  if (!vehicleId || !latitude || !longitude) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const locationData = {
    vehicleId,
    position: {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude)
    },
    speed: speed ? parseFloat(speed) : 0,
    timestamp: new Date()
  };
  
  // Emit the location update to all connected clients
  io.emit('vehicle_location', locationData);
  
  // Save to database (this will be handled by the controller)
  
  res.status(200).json({ success: true });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
