import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const SimpleMap = ({ position }) => {
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
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <div style={{ 
        width: '40px', 
        height: '40px', 
        borderRadius: '50%', 
        backgroundColor: '#3b82f6',
        marginBottom: '16px'
      }}></div>
      
      <div style={{ color: isDarkMode ? 'white' : 'black' }}>
        Simple Map View
      </div>
      
      <div style={{ 
        marginTop: '8px',
        color: isDarkMode ? '#9ca3af' : '#6b7280',
        fontSize: '14px'
      }}>
        Tap to view full screen
      </div>
    </div>
  );
};

export default SimpleMap;
