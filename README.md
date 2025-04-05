# VTrack - Vehicle Tracking System

A real-time vehicle tracking application that displays vehicle locations on a map, similar to Uber/Ola. The application shows the current location of vehicles, tracks their movement, and provides statistics about the journey.

## Features

- Real-time vehicle tracking on a map
- Vehicle status monitoring (parked, moving, speed)
- Driving statistics (speed, distance)
- Alerts system (theft, geofence, overspeed)
- Integration with ESP32 hardware for location data

## Tech Stack

- **Frontend**: React, Tailwind CSS, Google Maps API
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Real-time Updates**: Socket.io
- **Hardware**: ESP32 (for sending location data)

## Project Structure

```
vtrack/
├── public/                  # Static files
├── src/                     # Frontend React application
│   ├── assets/              # Images, icons, etc.
│   ├── components/          # React components
│   │   ├── map/             # Map-related components
│   │   └── ui/              # UI components
│   ├── pages/               # Page components
│   └── services/            # API and socket services
└── server/                  # Backend Node.js application
    ├── config/              # Configuration files
    ├── controllers/         # Route controllers
    ├── models/              # MongoDB models
    └── routes/              # API routes
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)
- Google Maps API key

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd vtrack
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd server
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vtrack
   NODE_ENV=development
   ```

5. Add your Google Maps API key in `src/components/map/MapComponent.jsx`

### Running the Application

1. Start the backend server:
   ```
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```
   # In the root directory
   npm run dev
   ```

3. To simulate ESP32 location updates (for testing):
   ```
   cd server
   node simulate-esp32.js
   ```

## Future Enhancements

- User authentication and vehicle management
- AI-powered theft detection
- Geofence alerts
- Overspeed notifications
- Historical route playback
- Mobile app version

## License

[MIT](LICENSE)
