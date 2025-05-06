import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

/**
 * A map component that embeds the standalone HTML map using an iframe
 * This avoids any issues with React state management or Docker networking
 */
const IframeMapComponent = ({ className }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const iframeRef = useRef(null);
  const [reloadKey, setReloadKey] = useState(Date.now());

  // Handle iframe load event
  const handleIframeLoad = () => {
    console.log('Iframe loaded');

    // Wait a bit for the iframe to fully initialize
    setTimeout(() => {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow) {
        console.log('Sending messages to iframe after delay');

        // Send a message to the iframe to update its theme
        iframe.contentWindow.postMessage({
          type: 'THEME_CHANGE',
          isDarkMode
        }, '*');

        // Send a message to the iframe to reload the map
        iframe.contentWindow.postMessage({
          type: 'RELOAD_MAP'
        }, '*');
      }
    }, 1000);
  };

  // Update the iframe's theme when the app's theme changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      // Send a message to the iframe to update its theme
      iframe.contentWindow.postMessage({
        type: 'THEME_CHANGE',
        isDarkMode
      }, '*');
    }
  }, [isDarkMode]);

  // Set up periodic reload
  useEffect(() => {
    console.log('Setting up periodic reload');

    // Reload the map every 10 seconds
    const intervalId = setInterval(() => {
      console.log('Periodic reload triggered');
      handleReload();
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => {
      console.log('Cleaning up periodic reload');
      clearInterval(intervalId);
    };
  }, []);

  // Function to reload the iframe
  const handleReload = () => {
    console.log('Reloading map iframe...');

    // Try to send a message to the iframe first
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      // Send a message to the iframe to reload the map
      iframe.contentWindow.postMessage({
        type: 'RELOAD_MAP'
      }, '*');
      console.log('Sent reload message to iframe');
    } else {
      // If the iframe is not accessible, reload it
      console.log('Iframe not accessible, reloading it');
      setReloadKey(Date.now());
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <iframe
        key={reloadKey}
        ref={iframeRef}
        src={`http://localhost:8000/map-test.html?t=${reloadKey}`}
        title="VTrack Map"
        className={className || 'w-full h-full rounded-lg overflow-hidden'}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff'
        }}
        onLoad={handleIframeLoad}
        allow="geolocation"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />

      {/* Reload button */}
      <button
        onClick={handleReload}
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          zIndex: 1000,
          backgroundColor: isDarkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          color: isDarkMode ? '#e5e7eb' : '#333333',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
        </svg>
      </button>
    </div>
  );
};

export default IframeMapComponent;
