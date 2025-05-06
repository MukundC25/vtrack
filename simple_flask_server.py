"""
Simple Flask Server for VTrack

This server receives location updates from ESP32 devices and serves them to the frontend.
"""

import os
import logging
from datetime import datetime
from flask import Flask, request, jsonify, render_template_string
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'vtrack_secret_key'

# Configure CORS to allow requests from any origin
CORS(app, resources={r"/*": {"origins": "*"}})

# Store the latest location data
latest_location = {
    'vehicleId': 'ESP32-001',
    'position': {
        'lat': 18.5204,  # Default to Pune
        'lng': 73.8567
    },
    'speed': 0,
    'timestamp': datetime.now().isoformat()
}

# API endpoint to receive location updates from ESP32
@app.route('/api/devices/<device_id>/location', methods=['POST'])
def update_location(device_id):
    """Handle location update from ESP32."""
    try:
        logger.info(f"Received location update from ESP32 device: {device_id}")
        logger.info(f"Request body: {request.json}")

        data = request.json
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        speed = data.get('speed', 0)

        if not latitude or not longitude:
            logger.error("Missing latitude or longitude")
            return jsonify({
                'success': False,
                'message': 'Latitude and longitude are required'
            }), 400

        # Update latest location data
        global latest_location
        latest_location = {
            'vehicleId': device_id,
            'position': {
                'lat': float(latitude),
                'lng': float(longitude)
            },
            'speed': float(speed),
            'timestamp': datetime.now().isoformat()
        }

        logger.info(f"Updated latest location: {latest_location}")

        # Return success response
        return jsonify({
            'success': True,
            'message': 'Location updated successfully',
            'location': {
                'latitude': float(latitude),
                'longitude': float(longitude),
                'timestamp': datetime.now().isoformat()
            }
        })

    except Exception as e:
        logger.error(f"Error processing location update: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Server error',
            'error': str(e)
        }), 500

# API endpoint to get the latest location
@app.route('/api/location/latest', methods=['GET'])
def get_latest_location():
    """Get the latest location data."""
    return jsonify(latest_location)

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'ok',
        'uptime': 'unknown'
    })

# Simple HTML page to display the location
@app.route('/', methods=['GET'])
def index():
    """Render a simple HTML page to display the location."""
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>VTrack Location</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            h1 { color: #333; }
            #location { margin-top: 20px; padding: 10px; background-color: #f5f5f5; border-radius: 5px; }
            button { padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; }
            button:hover { background-color: #45a049; }
        </style>
    </head>
    <body>
        <h1>VTrack Location</h1>
        <button onclick="fetchLocation()">Refresh Location</button>
        <div id="location">Loading location...</div>

        <script>
            function fetchLocation() {
                fetch('/api/location/latest')
                    .then(response => response.json())
                    .then(data => {
                        const locationDiv = document.getElementById('location');
                        locationDiv.innerHTML = `
                            <p><strong>Vehicle ID:</strong> ${data.vehicleId}</p>
                            <p><strong>Latitude:</strong> ${data.position.lat}</p>
                            <p><strong>Longitude:</strong> ${data.position.lng}</p>
                            <p><strong>Speed:</strong> ${data.speed} km/h</p>
                            <p><strong>Timestamp:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
                            <p><a href="https://www.google.com/maps?q=${data.position.lat},${data.position.lng}" target="_blank">View on Google Maps</a></p>
                        `;
                    })
                    .catch(error => {
                        console.error('Error fetching location:', error);
                        document.getElementById('location').innerHTML = 'Error fetching location data.';
                    });
            }

            // Fetch location on page load
            fetchLocation();

            // Refresh location every 10 seconds
            setInterval(fetchLocation, 10000);
        </script>
    </body>
    </html>
    """
    return render_template_string(html)

# Main entry point
if __name__ == '__main__':
    # Get port from environment variable or use default
    port = int(os.environ.get('PORT', 5003))

    # Get host from environment variable or use default
    host = os.environ.get('HOST', '0.0.0.0')

    logger.info(f"Starting server on {host}:{port}")

    # Get and display the server's IP addresses
    import socket
    hostname = socket.gethostname()
    try:
        ip_address = socket.gethostbyname(hostname)
        logger.info(f"Server hostname: {hostname}")
        logger.info(f"Server IP address: {ip_address}")
        logger.info(f"For ESP32 connection, use: http://{ip_address}:{port}/api/devices/ESP32-001/location")
    except:
        logger.info("Could not determine IP address")

    # Start the server
    app.run(host=host, port=port, debug=True)
