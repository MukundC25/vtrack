import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { ThemeContext } from '../context/ThemeContext';
import MobileFrame from '../components/ui/MobileFrame';
import FallbackMap from '../components/map/FallbackMap';

const MapFullScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Mock vehicle position - in a real app, this would come from API or context
  const [vehiclePosition, setVehiclePosition] = useState({
    lat: 18.6725,
    lng: 73.8926
  });

  // Google Maps API setup
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAD_jCqoP0qoh05t1ShKDwxRQd02pOM7Ts'
  });

  // Log any loading errors
  React.useEffect(() => {
    if (loadError) {
      console.error('Error loading Google Maps API:', loadError);
    }
  }, [loadError]);

  // Use fallback map only if there's an error loading Google Maps
  const useFallbackMap = loadError;

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  // Night mode style for Google Maps
  const darkModeStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];

  // Mock function to simulate vehicle movement
  useEffect(() => {
    const interval = setInterval(() => {
      setVehiclePosition(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MobileFrame>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#e5e7eb' : '#333333',
          zIndex: 20,
          position: 'relative',
          borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
        }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '9999px',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>

          <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Live Location</h1>

          <div style={{ width: '40px' }}></div> {/* Empty div for balance */}
        </div>

        {/* Map */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {useFallbackMap ? (
            <div style={{ height: '100%', width: '100%', position: 'relative' }}>
              <FallbackMap position={vehiclePosition} />
            </div>
          ) : !isLoaded ? (
            <div style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDarkMode ? '#242424' : '#e5e7eb'
            }}>
              <div style={{ color: isDarkMode ? 'white' : 'black' }}>Loading map...</div>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={vehiclePosition}
              zoom={16}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                styles: isDarkMode ? darkModeStyle : [],
              }}
            >
              <Marker
                position={vehiclePosition}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: '#3b82f6',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
              />
            </GoogleMap>
          )}
        </div>

        {/* Bottom info panel */}
        <div style={{
          padding: '16px',
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
          color: isDarkMode ? '#e5e7eb' : '#333333',
          borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontWeight: 'bold', margin: '0 0 4px 0', fontSize: '16px' }}>Yamaha FZ-S V4</h2>
              <p style={{ fontSize: '14px', color: isDarkMode ? '#9ca3af' : '#6b7280', margin: 0 }}>
                MITAOE Parking, Alandi, Pune
              </p>
            </div>

            <button style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
              color: 'white',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer'
            }}>
              Navigate
            </button>
          </div>
        </div>
      </div>
    </MobileFrame>
  );
};

export default MapFullScreen;
