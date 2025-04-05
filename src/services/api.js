import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vehicle API calls
export const getVehicles = () => api.get('/vehicles');
export const getVehicleById = (id) => api.get(`/vehicles/${id}`);
export const createVehicle = (vehicleData) => api.post('/vehicles', vehicleData);
export const updateVehicleStatus = (id, statusData) => api.put(`/vehicles/${id}/status`, statusData);
export const getVehicleStats = (id) => api.get(`/vehicles/${id}/stats`);

// Location API calls
export const recordLocation = (locationData) => api.post('/locations', locationData);
export const getLocationHistory = (vehicleId, params) => 
  api.get(`/locations/vehicle/${vehicleId}/history`, { params });
export const getLatestLocation = (vehicleId) => 
  api.get(`/locations/vehicle/${vehicleId}/latest`);

export default api;
