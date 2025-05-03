import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import VehicleMarker from './VehicleMarker';

/**
 * FallbackMap - A simple map component that doesn't rely on Google Maps API
 * Used when Google Maps fails to load or during development
 */
const FallbackMap = ({ position }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate('/map')}
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        backgroundColor: isDarkMode ? '#242424' : '#e5e7eb',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        cursor: 'pointer',
        overflow: 'hidden'
      }}
    >
      {/* Mock roads */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: 0, 
            right: 0, 
            height: '2px', 
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' 
          }}
        />
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            bottom: 0, 
            left: '50%', 
            width: '2px', 
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' 
          }}
        />
      </div>
      
      {/* Vehicle marker */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <div 
          style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: '#3b82f6', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          <div style={{ width: '8px', height: '8px', backgroundColor: 'white', borderRadius: '50%' }} />
        </div>
        
        {/* Pulsing circle */}
        <div 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            backgroundColor: '#3b82f6', 
            opacity: 0.4,
            animation: 'pulse 2s infinite'
          }}
        />
      </div>
      
      {/* Expand indicator */}
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
      
      {/* Tap to view full map */}
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
      
      {/* Fallback notice */}
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        fontSize: '12px',
        padding: '4px',
        borderRadius: '4px',
        zIndex: 10
      }}>
        Using fallback map
      </div>
    </div>
  );
};

export default FallbackMap;
