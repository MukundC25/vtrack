import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Clock from './Clock';

const FRAME_WIDTH = 375; // iPhone width in pixels
const FRAME_HEIGHT = 812; // iPhone height in pixels

const MobileFrame = ({ children }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const frameStyle = {
    width: `${FRAME_WIDTH}px`,
    height: `${FRAME_HEIGHT}px`,
    backgroundColor: 'var(--app-bg)',
    borderRadius: '40px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    margin: '0 auto',
    border: '8px solid #000',
    borderBottomWidth: '40px',
    boxSizing: 'content-box'
  };

  const contentStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '32px',
    backgroundColor: isDarkMode ? '#121212' : '#f8f9fa'
  };

  const statusBarStyle = {
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    backgroundColor: isDarkMode ? '#1f2937' : '#f8f9fa',
    color: isDarkMode ? '#e5e7eb' : '#333333',
    fontSize: '12px',
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
  };

  const bottomNavStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
    zIndex: 50
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'} style={frameStyle}>
      <div style={contentStyle}>
        {/* Status bar */}
        <div style={statusBarStyle}>
          <Clock />
          <div style={{ display: 'flex', gap: '4px' }}>
            <span>▲</span>
            <span>■</span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {children}
        </div>

        {/* Bottom Navigation Bar */}
        <div style={bottomNavStyle}>
          <div style={{ width: '128px', height: '4px', backgroundColor: '#000', borderRadius: '9999px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default MobileFrame;
