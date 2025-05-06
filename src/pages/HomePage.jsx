import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import MobileFrame from '../components/ui/MobileFrame';
import IframeMapComponent from '../components/map/IframeMapComponent';
import Header from '../components/ui/Header';
import StatusIndicators from '../components/ui/StatusIndicators';
import DrivingStats from '../components/ui/DrivingStats';
import BottomActions from '../components/ui/BottomActions';

import locationPoller from '../services/locationPoller';
import { getVehicleById, getVehicleStats, getLatestLocation } from '../services/api';

const HomePage = () => {
  const { isDarkMode } = useContext(ThemeContext);

  // Vehicle ID - in a real app, this would come from authentication or selection
  const vehicleId = '1'; // Placeholder ID

  // Vehicle data state
  const [vehicleData, setVehicleData] = useState({
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

  // Add useEffect for location updates
  useEffect(() => {
    console.log('Setting up location services...');
    console.log('Initial vehicle data:', vehicleData);

    // Use the locationPoller service to get location updates
    console.log('Subscribing to locationPoller service');
    const unsubscribe = locationPoller.subscribe((locationData) => {
      console.log('HomePage received location update from poller:', locationData);
      console.log('Current vehicle data before update:', vehicleData);
      updateVehicleWithLocation(locationData);
    });

    // Helper function to update vehicle data with location
    function updateVehicleWithLocation(locationData) {
      // Validate the location data
      if (!locationData || !locationData.position) {
        console.error('Invalid location data:', locationData);
        return;
      }

      console.log('Updating vehicle data with new position:', locationData.position);

      // Ensure position values are numbers
      const position = {
        lat: parseFloat(locationData.position.lat),
        lng: parseFloat(locationData.position.lng)
      };

      // Validate the parsed position
      if (isNaN(position.lat) || isNaN(position.lng)) {
        console.error('Invalid position coordinates:', locationData.position);
        return;
      }

      console.log('Parsed position for vehicle data:', position);

      // Force a re-render by creating a new position object
      // This is important for React to detect the change
      console.log('Setting vehicle data with position:', position);

      setVehicleData(prevData => {
        // Create a new object to ensure React detects the change
        const newData = {
          ...prevData,
          position: { ...position }, // Create a new position object
          speed: locationData.speed || 0,
          status: locationData.speed > 0 ? 'Moving' : 'Parked',
          ignition: locationData.speed > 0 ? 'On' : 'Off'
        };

        // Log the change for debugging
        console.log('Previous position:', prevData.position);
        console.log('New position:', position);
        console.log('Updated vehicle data:', newData);

        return newData;
      });

      // Log after state update is scheduled
      console.log('Vehicle data update scheduled');

      // Log that the update has been applied
      console.log('Vehicle data update applied');
    }

    // Cleanup function
    return () => {
      unsubscribe();
      console.log('Unsubscribed from locationPoller service');
    };
  }, [vehicleId]);

  // Log when vehicleData changes
  useEffect(() => {
    console.log('vehicleData changed:', vehicleData);
  }, [vehicleData]);

  return (
    <MobileFrame>
      <div className="flex-1 overflow-auto pb-20 relative" style={{ color: isDarkMode ? '#e5e7eb' : '#333333' }}>
        <Header />

        <h1 className="text-2xl font-bold text-center my-4" style={{ color: isDarkMode ? '#ffffff' : '#111827' }}>
          Track Your Vehicle
        </h1>

        {/* Map Component - Taking more screen space */}
        <div className="relative overflow-hidden rounded-xl mx-4 mb-4"
             style={{
               height: '280px',
               boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
             }}>
          <IframeMapComponent />
        </div>

        {/* Content area with padding */}
        <div className="px-4">
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
