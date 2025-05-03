# 🚗 VTrack – Real-Time Vehicle Tracking System

> **Track smarter. Move safer.**  
A real-time vehicle tracking web application inspired by platforms like Uber/Ola. VTrack allows you to visualize and monitor vehicles on a map with live updates, smart alerts, and insightful driving statistics.

---

## ✨ Features

- 📍 **Live Location Tracking** – Real-time GPS location updates on Google Maps  
- 🚘 **Vehicle Monitoring** – Check speed, movement status (moving/parked), and direction  
- 📊 **Driving Stats** – Monitor speed, distance traveled, and activity logs  
- 🚨 **Smart Alerts** – Theft detection, overspeed warnings, and geofence breach alerts  
- 🔌 **ESP32 Hardware Integration** – Collects and transmits GPS data to the system

---

## 🛠️ Tech Stack

| Layer        | Tech Used                            |
|--------------|---------------------------------------|
| **Frontend** | React, Tailwind CSS, Google Maps API  |
| **Backend**  | Node.js, Express                      |
| **Database** | MongoDB                               |
| **Real-Time**| Socket.io                             |
| **Hardware** | ESP32 Microcontroller (GPS + WiFi)    |

---

## 📁 Project Structure

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

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)
- Google Maps API key
- Docker and Docker Compose (for containerized setup)


### 🧩 Installation

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


### ▶️ Run the Application

#### Option 1: 🐳 Docker (Recommended)

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

#### Option 2: 🧪 Running Locally

1. Start the frontend development server:
   ```
   # In the root directory
   npm run dev -- --port 5500
   ```

## 📡 ESP32 Hardware Integration

The application is designed to work with ESP32 microcontrollers that send GPS location data. The ESP32 integration will be implemented in a future update.

🔮 Future Enhancements

    🔐 User authentication and vehicle management

    🤖 AI-based theft detection and driver behavior analysis

    📱 Mobile app (React Native or Flutter)

    📍 Geofence boundary alerts

    ⏪ Historical route playback

    🚧 Admin dashboard for managing multiple vehicles

## 📄 License

[MIT](LICENSE)

Made with ❤️ by Mukund Chavan and team
