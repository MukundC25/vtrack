import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import MobileFrame from '../components/ui/MobileFrame';

const SimpleMapFullScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
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
        
        {/* Simple Map */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: isDarkMode ? '#242424' : '#e5e7eb',
          flexDirection: 'column'
        }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            backgroundColor: '#3b82f6',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%' }}></div>
          </div>
          
          <div style={{ color: isDarkMode ? 'white' : 'black', fontSize: '18px', marginBottom: '8px' }}>
            Simple Full Screen Map
          </div>
          
          <div style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: '14px' }}>
            This is a placeholder for Google Maps
          </div>
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

export default SimpleMapFullScreen;
