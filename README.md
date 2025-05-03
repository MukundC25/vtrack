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
└── server/                  # Backend Node.js application (future implementation)
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)
- Google Maps API key
- Docker and Docker Compose (for containerized setup)

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

3. Add your Google Maps API key in `src/components/map/MapComponent.jsx`

### Running the Application

#### Option 1: Using Docker (Recommended)

This project is configured to run in an isolated Docker container to prevent version conflicts with other projects.

1. Build and start the container:
   ```bash
   docker-compose up -d
   ```

2. Access the application at:
   ```
   http://localhost:5500
   ```

3. To stop the container:
   ```bash
   docker-compose down
   ```

#### Option 2: Running Locally

1. Start the frontend development server:
   ```
   # In the root directory
   npm run dev -- --port 5500
   ```

## ESP32 Hardware Integration

The application is designed to work with ESP32 microcontrollers that send GPS location data. The ESP32 integration will be implemented in a future update.

## Future Enhancements

- User authentication and vehicle management
- AI-powered theft detection
- Geofence alerts
- Overspeed notifications
- Historical route playback
- Mobile app version

## License

[MIT](LICENSE)
