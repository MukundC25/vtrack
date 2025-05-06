import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const BottomActions = ({ alerts }) => {
  const { isDarkMode } = useContext(ThemeContext);

  // Define card styles
  const cardStyle = {
    backgroundColor: 'var(--app-card-bg)',
    borderColor: 'var(--app-card-border)',
    borderWidth: '1px',
    borderStyle: 'solid',
    transition: 'all 0.3s ease'
  };

  // Define gradient colors
  const getGradient = (color) => {
    switch(color) {
      case 'red':
        return isDarkMode ? 'rgba(220, 38, 38, 0.1)' : 'rgba(239, 68, 68, 0.05)';
      case 'yellow':
        return isDarkMode ? 'rgba(217, 119, 6, 0.1)' : 'rgba(245, 158, 11, 0.05)';
      case 'blue':
        return isDarkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(59, 130, 246, 0.05)';
      default:
        return isDarkMode ? 'rgba(75, 85, 99, 0.1)' : 'rgba(229, 231, 235, 0.5)';
    }
  };

  return (
    <div className="mb-16">
      {/* Alert Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Theft Alerts */}
        <div className="rounded-xl p-3 shadow-md transition-colors"
             style={{
               ...cardStyle,
               background: `linear-gradient(135deg, var(--app-card-bg), var(--app-card-bg))`,
               backgroundColor: getGradient('red')
             }}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     style={{ color: isDarkMode ? '#ef4444' : '#dc2626' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Theft Alerts
              </h4>
              <p className="text-2xl font-bold" style={{ color: isDarkMode ? '#ef4444' : '#dc2626' }}>
                {alerts.theft.toString().padStart(2, '0')}
              </p>
              <p className="text-xs" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
                Vasundhara Society, Alandi
              </p>
            </div>
            {alerts.theft > 0 && (
              <span className="h-3 w-3 rounded-full animate-pulse" style={{ backgroundColor: isDarkMode ? '#ef4444' : '#dc2626' }}></span>
            )}
          </div>
        </div>

        {/* Geofence Alerts */}
        <div className="rounded-xl p-3 shadow-md transition-colors"
             style={{
               ...cardStyle,
               background: `linear-gradient(135deg, var(--app-card-bg), var(--app-card-bg))`,
               backgroundColor: getGradient('yellow')
             }}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     style={{ color: isDarkMode ? '#f59e0b' : '#d97706' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Geofence
              </h4>
              <p className="text-2xl font-bold" style={{ color: isDarkMode ? '#f59e0b' : '#d97706' }}>
                {alerts.geofence}
              </p>
              <div className="text-2xl">😀</div>
            </div>
            {alerts.geofence > 0 && (
              <span className="h-3 w-3 rounded-full animate-pulse" style={{ backgroundColor: isDarkMode ? '#f59e0b' : '#d97706' }}></span>
            )}
          </div>
        </div>

        {/* Overspeed */}
        <div className="rounded-xl p-3 shadow-md transition-colors"
             style={{
               ...cardStyle,
               background: `linear-gradient(135deg, var(--app-card-bg), var(--app-card-bg))`,
               backgroundColor: getGradient('blue')
             }}>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                     style={{ color: isDarkMode ? '#3b82f6' : '#2563eb' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Overspeed
              </h4>
              <p className="text-2xl font-bold" style={{ color: isDarkMode ? '#3b82f6' : '#2563eb' }}>
                {alerts.overspeed}
              </p>
              <p className="text-xs" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
                Near Kalyani Nagar, Pune
              </p>
              <p className="text-xs" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
                km/hr
              </p>
            </div>
            {alerts.overspeed > 0 && (
              <span className="h-3 w-3 rounded-full animate-pulse" style={{ backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb' }}></span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl p-3 shadow-md flex flex-col items-center justify-center transition-colors" style={cardStyle}>
          <h4 className="font-semibold text-sm text-center mb-2">Past Locations</h4>
          <button className="text-white text-sm py-1.5 px-5 rounded-lg transition-colors w-full"
                  style={{ backgroundColor: isDarkMode ? '#1f2937' : '#374151' }}>
            View
          </button>
        </div>

        <div className="rounded-xl p-3 shadow-md flex flex-col items-center justify-center transition-colors" style={cardStyle}>
          <h4 className="font-semibold text-sm text-center mb-2">Send SOS</h4>
          <button className="text-white rounded-full p-2.5 transition-colors"
                  style={{ backgroundColor: isDarkMode ? '#dc2626' : '#ef4444' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>

        <div className="rounded-xl p-3 shadow-md flex flex-col items-center justify-center transition-colors" style={cardStyle}>
          <h4 className="font-semibold text-sm text-center mb-2">Driving AI</h4>
          <button className="text-white text-sm py-1.5 px-5 rounded-lg transition-colors w-full"
                  style={{ background: `linear-gradient(to right, ${isDarkMode ? '#2563eb' : '#3b82f6'}, ${isDarkMode ? '#4f46e5' : '#6366f1'})` }}>
            Use
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomActions;
