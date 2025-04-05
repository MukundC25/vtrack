import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      
      this.socket.on('connect', () => {
        console.log('Socket connected');
        this.connected = true;
      });
      
      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
        this.connected = false;
      });
      
      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        this.connected = false;
      });
    }
    
    return this.socket;
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }
  
  // Subscribe to vehicle location updates
  subscribeToLocationUpdates(callback) {
    if (!this.socket) this.connect();
    
    this.socket.on('vehicle_location', (data) => {
      callback(data);
    });
    
    return () => {
      this.socket.off('vehicle_location');
    };
  }
}

export default new SocketService();
