import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const DrivingStats = ({ speedStats, distanceToday, distanceWeek, lastLocation }) => {
  const { isDarkMode } = useContext(ThemeContext);

  // Define gradient colors based on theme
  const gradients = {
    blue: {
      from: isDarkMode ? '#1e40af' : '#3b82f6',
      to: isDarkMode ? '#2563eb' : '#60a5fa'
    },
    green: {
      from: isDarkMode ? '#065f46' : '#10b981',
      to: isDarkMode ? '#059669' : '#34d399'
    },
    red: {
      from: isDarkMode ? '#991b1b' : '#ef4444',
      to: isDarkMode ? '#dc2626' : '#f87171'
    },
    purple: {
      from: isDarkMode ? '#5b21b6' : '#8b5cf6',
      to: isDarkMode ? '#7c3aed' : '#a78bfa'
    },
    indigo: {
      from: isDarkMode ? '#1e40af' : '#4f46e5',
      to: isDarkMode ? '#3730a3' : '#6366f1'
    }
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: isDarkMode ? '#9ca3af' : '#4b5563' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Driving Statistics
        </h3>
        <div className="flex items-center text-sm px-2 py-1 rounded-full transition-colors"
             style={{
               backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
               color: isDarkMode ? '#9ca3af' : '#6b7280'
             }}>
          <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: gradients.blue.from }}></span>
          Today's Stats
        </div>
      </div>

      {/* Speed Stats */}
      <div className="rounded-xl p-4 mb-3 shadow-md transition-colors"
           style={{
             backgroundColor: 'var(--app-card-bg)',
             borderColor: 'var(--app-card-border)',
             borderWidth: '1px',
             borderStyle: 'solid'
           }}>
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium text-sm" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Speed (km/hr)</p>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" style={{ color: isDarkMode ? '#9ca3af' : '#9ca3af' }}>
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="text-white p-3 rounded-xl shadow-sm transition-all"
               style={{ background: `linear-gradient(135deg, ${gradients.blue.from}, ${gradients.blue.to})` }}>
            <p className="text-2xl font-bold">{speedStats.average}</p>
            <p className="text-xs font-medium uppercase tracking-wide mt-1">Average</p>
          </div>
          <div className="text-white p-3 rounded-xl shadow-sm transition-all"
               style={{ background: `linear-gradient(135deg, ${gradients.green.from}, ${gradients.green.to})` }}>
            <p className="text-2xl font-bold">{speedStats.minimum}</p>
            <p className="text-xs font-medium uppercase tracking-wide mt-1">Minimum</p>
          </div>
          <div className="text-white p-3 rounded-xl shadow-sm transition-all"
               style={{ background: `linear-gradient(135deg, ${gradients.red.from}, ${gradients.red.to})` }}>
            <p className="text-2xl font-bold">{speedStats.maximum}</p>
            <p className="text-xs font-medium uppercase tracking-wide mt-1">Maximum</p>
          </div>
        </div>
      </div>

      {/* Distance Stats */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {/* Distance Travelled */}
        <div className="rounded-xl p-4 shadow-md transition-colors"
             style={{
               backgroundColor: 'var(--app-card-bg)',
               borderColor: 'var(--app-card-border)',
               borderWidth: '1px',
               borderStyle: 'solid'
             }}>
          <p className="font-medium text-sm mb-2 flex items-center" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Distance
          </p>
          <div className="space-y-2">
            <div className="text-white p-2 rounded-lg text-center transition-all"
                 style={{ background: `linear-gradient(to right, ${gradients.purple.from}, ${gradients.purple.to})` }}>
              <p className="text-xl font-bold">{distanceToday}</p>
              <p className="text-xs">05 Jan - 06 Jan</p>
            </div>
            <div className="text-white p-2 rounded-lg text-center transition-all"
                 style={{ background: `linear-gradient(to right, ${gradients.indigo.from}, ${gradients.blue.to})` }}>
              <p className="text-xl font-bold">{distanceWeek}</p>
              <p className="text-xs">Last Week</p>
            </div>
          </div>
        </div>

        {/* Last Location */}
        <div className="rounded-xl p-4 shadow-md transition-colors"
             style={{
               backgroundColor: 'var(--app-card-bg)',
               borderColor: 'var(--app-card-border)',
               borderWidth: '1px',
               borderStyle: 'solid'
             }}>
          <p className="font-medium text-sm mb-2 flex items-center" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Last Location
          </p>
          <div className="p-2 rounded-lg transition-colors"
               style={{ backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}>
            <p className="text-sm font-medium">{lastLocation.address}</p>
            <p className="text-xs flex items-center mt-1" style={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              At: {lastLocation.time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrivingStats;
