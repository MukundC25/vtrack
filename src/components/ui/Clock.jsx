import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Format time as HH:MM
  const formattedTime = time.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });
  
  return (
    <span className="font-medium">{formattedTime}</span>
  );
};

export default Clock;
