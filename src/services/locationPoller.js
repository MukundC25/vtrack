/**
 * Location Polling Service
 *
 * This service polls the Flask server for the latest location data
 * and notifies subscribers when new data is available.
 */

// Flask server URL
const FLASK_SERVER_URL = 'http://192.168.169.156:5003';

class LocationPollingService {
  constructor() {
    this.isPolling = false;
    this.pollingInterval = null;
    this.pollingDelay = 1000; // 1 second for more responsive updates
    this.callbacks = [];
    this.lastLocation = null;
  }

  /**
   * Start polling for location updates
   */
  startPolling() {
    if (this.isPolling) return;

    console.log('Starting location polling...');
    this.isPolling = true;
    this.pollingInterval = setInterval(() => {
      this.fetchLatestLocation();
    }, this.pollingDelay);

    // Fetch immediately on start
    this.fetchLatestLocation();
  }

  /**
   * Stop polling for location updates
   */
  stopPolling() {
    if (!this.isPolling) return;

    console.log('Stopping location polling...');
    this.isPolling = false;
    clearInterval(this.pollingInterval);
    this.pollingInterval = null;
  }

  /**
   * Fetch the latest location from the Flask server
   */
  async fetchLatestLocation() {
    try {
      console.log('Fetching latest location...');

      // Add a timestamp to prevent caching
      const timestamp = new Date().getTime();

      // Add a timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch(`${FLASK_SERVER_URL}/api/location/latest?t=${timestamp}`, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

      clearTimeout(timeoutId); // Clear the timeout

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received location data:', data);

      // Ensure we have valid data
      if (!data || !data.position) {
        console.error('Invalid location data received:', data);
        return;
      }

      // Ensure position values are numbers
      const position = {
        lat: parseFloat(data.position.lat),
        lng: parseFloat(data.position.lng)
      };

      // Check if the values are valid numbers
      if (isNaN(position.lat) || isNaN(position.lng)) {
        console.error('Invalid position coordinates:', data.position);
        return;
      }

      // Update the position in the data object
      data.position = position;

      // Log the parsed position
      console.log('Parsed position:', position);

      // Check if the position has changed
      const hasChanged = !this.lastLocation ||
                         this.lastLocation.position.lat !== position.lat ||
                         this.lastLocation.position.lng !== position.lng;

      if (hasChanged) {
        console.log('Position has changed, notifying callbacks');

        // Update the last location
        this.lastLocation = data;

        // Notify callbacks
        this.notifyCallbacks(data);

        // Also log to console for debugging
        console.log('LOCATION UPDATE:', JSON.stringify(position));
      } else {
        console.log('Position has not changed, skipping update');
      }
    } catch (error) {
      console.error('Error fetching location:', error);

      // If we have a last location, keep using it
      if (this.lastLocation) {
        console.log('Using last known location due to fetch error');
      }
    }
  }

  /**
   * Check if the location has changed
   * @param {Object} newLocation - The new location data
   * @returns {boolean} - True if the location has changed
   */
  hasLocationChanged(newLocation) {
    if (!this.lastLocation) return true;

    // Compare position coordinates
    const oldPos = this.lastLocation.position;
    const newPos = newLocation.position;

    return (
      oldPos.lat !== newPos.lat ||
      oldPos.lng !== newPos.lng ||
      this.lastLocation.speed !== newLocation.speed
    );
  }

  /**
   * Subscribe to location updates
   * @param {Function} callback - The callback function to call when new location data is available
   * @returns {Function} - A function to unsubscribe
   */
  subscribe(callback) {
    console.log('Subscribing to location updates');
    this.callbacks.push(callback);

    // Start polling if this is the first subscriber
    if (this.callbacks.length === 1) {
      this.startPolling();
    }

    // Return unsubscribe function
    return () => {
      console.log('Unsubscribing from location updates');
      this.callbacks = this.callbacks.filter(cb => cb !== callback);

      // Stop polling if there are no more subscribers
      if (this.callbacks.length === 0) {
        this.stopPolling();
      }
    };
  }

  /**
   * Notify all callbacks with the new location data
   * @param {Object} locationData - The location data
   */
  notifyCallbacks(locationData) {
    console.log('Notifying callbacks with new location data');
    this.callbacks.forEach(callback => {
      try {
        callback(locationData);
      } catch (error) {
        console.error('Error in location callback:', error);
      }
    });
  }
}

export default new LocationPollingService();
