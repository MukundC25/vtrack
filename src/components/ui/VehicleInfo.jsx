import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const VehicleInfo = ({ name, registrationNumber, location }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      padding: '12px',
      borderRadius: '10px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      maxWidth: '90%',
      backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
      color: isDarkMode ? '#e5e7eb' : '#333333',
      borderColor: isDarkMode ? '#374151' : '#e5e7eb',
      borderWidth: '1px',
      borderStyle: 'solid',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ paddingRight: '8px' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>
            {name} <span style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: '12px' }}>{registrationNumber}</span>
          </h3>
          <p style={{ fontSize: '14px', color: isDarkMode ? '#9ca3af' : '#6b7280', margin: '4px 0 0 0' }}>
            {location}
          </p>
        </div>
        <div style={{ flexShrink: 0, marginLeft: '8px' }}>
          <img src="/vehicle-marker.svg" alt="Vehicle" style={{ width: '40px', height: '40px' }} />
        </div>
      </div>
    </div>
  );
};

export default VehicleInfo;
