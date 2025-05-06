import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const StatusIndicators = ({ status, ignition, speed }) => {
  const { isDarkMode } = useContext(ThemeContext);

  // Define status colors
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'moving': return isDarkMode ? '#059669' : '#10b981'; // green
      case 'parked': return isDarkMode ? '#2563eb' : '#3b82f6'; // blue
      case 'idle': return isDarkMode ? '#d97706' : '#f59e0b';   // yellow
      default: return isDarkMode ? '#4b5563' : '#6b7280';       // gray
    }
  };

  const getIgnitionColor = (ignition) => {
    return ignition.toLowerCase() === 'on'
      ? (isDarkMode ? '#059669' : '#10b981')  // green
      : (isDarkMode ? '#dc2626' : '#ef4444'); // red
  };

  const getSpeedColor = () => {
    return isDarkMode ? '#4b5563' : '#6b7280'; // gray
  };

  return (
    <div className="grid grid-cols-3 gap-3 mb-4 mt-4">
      <div
        className="text-white rounded-xl p-3 text-center shadow-md transition-colors"
        style={{ backgroundColor: getStatusColor(status) }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h4 className="text-xs font-medium uppercase tracking-wide mb-1">Status</h4>
          <p className="text-lg font-bold">{status}</p>
        </div>
      </div>

      <div
        className="text-white rounded-xl p-3 text-center shadow-md transition-colors"
        style={{ backgroundColor: getIgnitionColor(ignition) }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h4 className="text-xs font-medium uppercase tracking-wide mb-1">Ignition</h4>
          <p className="text-lg font-bold">{ignition}</p>
        </div>
      </div>

      <div
        className="text-white rounded-xl p-3 text-center shadow-md transition-colors"
        style={{ backgroundColor: getSpeedColor() }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h4 className="text-xs font-medium uppercase tracking-wide mb-1">Speed</h4>
          <p className="text-lg font-bold">{speed}</p>
          <p className="text-xs">km/hr</p>
        </div>
      </div>
    </div>
  );
};

export default StatusIndicators;
