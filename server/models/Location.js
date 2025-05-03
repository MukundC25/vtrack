const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  position: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  address: {
    type: String
  },
  speed: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient querying by vehicle and time
LocationSchema.index({ vehicleId: 1, timestamp: -1 });

module.exports = mongoose.model('Location', LocationSchema);
