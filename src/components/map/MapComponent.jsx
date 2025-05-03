/**
 * MapComponent.jsx
 *
 * This component renders the Google Maps interface for the vehicle tracking application.
 * It displays the current location of the vehicle and allows navigation to a full-screen map view.
 *
 * Features:
 * - Integrates with Google Maps API
 * - Supports dark/light mode with custom map styling
 * - Shows vehicle location with a custom marker
 * - Provides navigation to full-screen map view
 * - Handles loading states gracefully
 *
 * @author Your Name
 * @version 1.0.0
 * @date June 10, 2024
 */

import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { ThemeContext } from '../../context/ThemeContext';
import VehicleMarker from './VehicleMarker';
import FallbackMap from './FallbackMap';

/**
 * Container style for the Google Map component
 * Sets the map to fill its parent container
 */
const containerStyle = {
  width: '100%',
  height: '100%'
};

/**
 * Default center coordinates for the map (Pune, India)
 * Used when no vehicle position is available
 */
const defaultCenter = {
  lat: 18.5204, // Latitude for Pune, India
  lng: 73.8567  // Longitude for Pune, India
};

/**
 * Custom styling for Google Maps in dark mode
 * This styling is applied when the application is in dark mode
 * It provides a dark-themed map that's easier on the eyes in low-light environments
 */
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

/**
 * MapComponent - Renders a Google Map showing vehicle location
 *
 * @param {Object} props - Component props
 * @param {Object} props.position - The vehicle's current position (lat/lng)
 * @returns {JSX.Element} - Rendered component
 */
const MapComponent = ({ position }) => {
  // Access theme context to apply appropriate styling
  const { isDarkMode } = useContext(ThemeContext);
  // Navigation hook for redirecting to full map view
  const navigate = useNavigate();
  // State to store the map instance
  const [map, setMap] = useState(null);

  // Load the Google Maps JavaScript API
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAD_jCqoP0qoh05t1ShKDwxRQd02pOM7Ts' // Google Maps API key
  });

  // Log any loading errors
  React.useEffect(() => {
    if (loadError) {
      console.error('Error loading Google Maps API:', loadError);
    }
  }, [loadError]);

  // Use fallback map only if there's an error loading Google Maps
  const useFallbackMap = loadError;

  /**
   * Callback function that runs when the map is loaded
   * Stores the map instance in state for potential later use
   */
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  /**
   * Callback function that runs when the component unmounts
   * Cleans up the map instance to prevent memory leaks
   */
  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  /**
   * Render loading state while Google Maps API is being loaded
   * Shows a centered loading message with appropriate theme styling
   */
  // Use fallback map if there's an error loading Google Maps
  if (useFallbackMap) {
    return <FallbackMap position={position} />;
  }

  // Show loading indicator while Google Maps is loading
  if (!isLoaded) {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode ? '#242424' : '#e5e7eb',
      }}>
        <div style={{ color: isDarkMode ? 'white' : 'black' }}>Loading map...</div>
      </div>
    );
  }

  /**
   * Render the Google Map with vehicle marker and UI overlays
   * The entire component is clickable and navigates to the full map view
   */
  return (
    <div
      style={{ height: '100%', width: '100%', position: 'relative', cursor: 'pointer' }}
      onClick={() => navigate('/map')} // Navigate to full map view on click
    >
      {/* Google Map Component */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position || defaultCenter} // Use vehicle position or default to Pune
        zoom={15} // Street-level zoom
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: false, // Hide zoom controls for cleaner UI
          streetViewControl: false, // Hide street view
          mapTypeControl: false, // Hide map type selector
          fullscreenControl: false, // Hide fullscreen button
          styles: isDarkMode ? darkModeStyle : [], // Apply dark mode styling when appropriate
        }}
      >
        {/* Vehicle position marker - only shown when position is available */}
        {position && (
          <Marker
            position={position}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8, // Size of the marker
              fillColor: '#3b82f6', // Blue fill
              fillOpacity: 1,
              strokeColor: '#ffffff', // White border
              strokeWeight: 2,
            }}
          />
        )}
      </GoogleMap>

      {/* Expand indicator - shows that the map can be expanded */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '9999px',
        padding: '4px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        zIndex: 10
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px', color: '#4b5563' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
        </svg>
      </div>

      {/* Instruction overlay - informs user they can tap for full view */}
      <div style={{
        position: 'absolute',
        bottom: '8px',
        left: '8px',
        right: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        fontSize: '12px',
        padding: '4px',
        borderRadius: '4px',
        textAlign: 'center',
        zIndex: 10
      }}>
        Tap to view full map
      </div>
    </div>
  );
};

export default MapComponent;
