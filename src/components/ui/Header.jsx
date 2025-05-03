import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const headerStyle = {
    padding: '10px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    zIndex: 20,
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    color: isDarkMode ? '#e5e7eb' : '#333333',
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
  };

  const buttonStyle = {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    transition: 'background-color 0.3s ease'
  };

  return (
    <header style={headerStyle}>
      <div style={{ flex: 1 }}></div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        {/* App logo or name could go here */}
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <ThemeToggle style={buttonStyle} />

        <button style={buttonStyle} aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        <div style={{ position: 'relative' }}>
          <button style={buttonStyle} aria-label="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            backgroundColor: '#ef4444',
            borderRadius: '9999px',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></span>
        </div>

        <button style={buttonStyle} aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
