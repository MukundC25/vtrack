import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import MobileFrame from '../components/ui/MobileFrame';
import MapComponent from '../components/map/MapComponent';
import Header from '../components/ui/Header';
import VehicleInfo from '../components/ui/VehicleInfo';
import StatusIndicators from '../components/ui/StatusIndicators';
import DrivingStats from '../components/ui/DrivingStats';
import BottomActions from '../components/ui/BottomActions';
import Clock from '../components/ui/Clock';
import socketService from '../services/socket';
import { getVehicleById, getVehicleStats, getLatestLocation } from '../services/api';

const HomePage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  // Vehicle ID - in a real app, this would come from authentication or selection
  const vehicleId = '1'; // Placeholder ID

  // Vehicle data state
  const [vehicleData, setVehicleData] = useState({
    name: 'Yamaha FZ-S V4',
    registrationNumber: '(MH50-329)',
    location: 'MITAOE Parking, Alandi, Pune',
    status: 'Parked',
    ignition: 'Off',
    speed: 0,
    speedStats: {
      average: 25,
      minimum: 8,
      maximum: 90
    },
    distanceToday: '19 KM',
    distanceWeek: '65 KM',
    lastLocation: {
      address: 'Vasundhara Society, Alandi',
      time: '08:10:32s'
    },
    alerts: {
      theft: 1,
      geofence: 0,
      overspeed: 101
    },
    position: {
      lat: 18.6725,
      lng: 73.8926
    }
  });

  // Add useEffect for socket connection and data fetching
  useEffect(() => {
    // Connect to socket for real-time updates
    const socket = socketService.connect();

    // Subscribe to location updates
    const unsubscribe = socketService.subscribeToLocationUpdates((locationData) => {
      if (locationData.vehicleId === vehicleId) {
        // Update vehicle position and speed
        setVehicleData(prevData => ({
          ...prevData,
          position: locationData.position,
          speed: locationData.speed || 0,
          status: locationData.speed > 0 ? 'Moving' : 'Parked',
          ignition: locationData.speed > 0 ? 'On' : 'Off'
        }));
      }
    });

    // Fetch initial vehicle data
    // In a real app with a backend, you would uncomment these API calls
    /*
    const fetchVehicleData = async () => {
      try {
        // Get vehicle details
        const vehicleResponse = await getVehicleById(vehicleId);

        // Get vehicle stats
        const statsResponse = await getVehicleStats(vehicleId);

        // Get latest location
        const locationResponse = await getLatestLocation(vehicleId);

        // Update state with fetched data
        setVehicleData(prevData => ({
          ...prevData,
          ...vehicleResponse.data,
          speedStats: statsResponse.data.speed,
          distanceToday: `${statsResponse.data.distance.today} KM`,
          distanceWeek: `${statsResponse.data.distance.week} KM`,
          position: locationResponse.data.position,
          speed: locationResponse.data.speed
        }));
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchVehicleData();
    */

    // Cleanup function
    return () => {
      unsubscribe();
      socketService.disconnect();
    };
  }, [vehicleId]);

  return (
    <MobileFrame>
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: '80px', position: 'relative', color: isDarkMode ? '#e5e7eb' : '#333333' }}>
        <Header />

        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '16px 0',
          color: isDarkMode ? '#ffffff' : '#111827'
        }}>
          Track Your Vehicle
        </h1>

        {/* Map Component - Taking more screen space */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          height: '280px',
          margin: '0 16px 16px 16px',
          borderRadius: '12px'
        }}>
          <MapComponent position={vehicleData.position} />
          <VehicleInfo
            name={vehicleData.name}
            registrationNumber={vehicleData.registrationNumber}
            location={vehicleData.location}
          />
        </div>

        {/* Content area with padding */}
        <div style={{ padding: '0 16px' }}>
          {/* Status Indicators */}
          <StatusIndicators
            status={vehicleData.status}
            ignition={vehicleData.ignition}
            speed={vehicleData.speed}
          />

          {/* Driving Statistics */}
          <DrivingStats
            speedStats={vehicleData.speedStats}
            distanceToday={vehicleData.distanceToday}
            distanceWeek={vehicleData.distanceWeek}
            lastLocation={vehicleData.lastLocation}
          />

          {/* Bottom Actions */}
          <BottomActions alerts={vehicleData.alerts} />
        </div>
      </div>
    </MobileFrame>
  );
};

export default HomePage;
