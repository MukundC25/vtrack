const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  owner: {
    type: String,
    required: true
  },
  deviceId: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Parked', 'Moving', 'Idle', 'Offline'],
    default: 'Offline'
  },
  ignition: {
    type: String,
    enum: ['On', 'Off'],
    default: 'Off'
  },
  lastLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
