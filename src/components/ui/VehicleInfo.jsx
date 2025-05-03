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
          <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>
            {name} <span style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: '12px' }}>{registrationNumber}</span>
          </h3>
          <p style={{ fontSize: '14px', display: 'flex', alignItems: 'center', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '12px', width: '12px', marginRight: '4px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
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
