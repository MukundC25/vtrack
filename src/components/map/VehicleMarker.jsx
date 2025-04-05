import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const VehicleMarker = ({ position }) => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <div 
      className="absolute" 
      style={{ 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      }}
    >
      {/* Pulsing outer circle */}
      <div className="absolute -inset-8 flex items-center justify-center">
        <div 
          className="w-16 h-16 rounded-full opacity-30 animate-ping" 
          style={{ backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb' }}
        />
      </div>
      
      {/* Secondary pulse */}
      <div className="absolute -inset-4 flex items-center justify-center">
        <div 
          className="w-8 h-8 rounded-full opacity-50 animate-pulse" 
          style={{ 
            backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
            animationDuration: '2s'
          }}
        />
      </div>
      
      {/* Main marker */}
      <div 
        className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-20"
        style={{ 
          backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
          borderColor: isDarkMode ? '#e5e7eb' : '#ffffff'
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

export default VehicleMarker;
