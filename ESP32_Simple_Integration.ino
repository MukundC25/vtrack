/**
 * ESP32 VTrack Integration - Simple Version
 *
 * This code gets location data from Google Geolocation API and sends it to:
 * 1. The Flask server endpoint
 * 2. Via email as a backup
 */

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>

// WiFi Credentials
#define WIFI_SSID "realme 12 Pro 5G"
#define WIFI_PASSWORD "12345678"

// Flask Server Details
#define FLASK_SERVER_IP "192.168.169.156" // Replace with your Mac's IP address
#define FLASK_API_URL "http://192.168.169.156:5003/api/devices/ESP32-001/location"
#define DEVICE_ID "ESP32-001"

// Google Geolocation API
#define GOOGLE_API_KEY "AIzaSyAD_jCqoP0qoh05t1ShKDwxRQd02pOM7Ts"

// SMTP Server Details
#define SMTP_HOST "smtp.gmail.com"
#define SMTP_PORT 465
#define AUTHOR_EMAIL "vehicletrack26@gmail.com"
#define AUTHOR_PASSWORD "sctx sehp zcva apex"
#define RECIPIENT_EMAIL "mukundchavan2625@gmail.com"

// Function Prototypes
bool getLocationFromGoogle(float &lat, float &lon);
void sendLocationToFlaskServer(float lat, float lon);
void sendEmail(String messageBody);
String base64Encode(String input);
void testServerConnection();

// Global variables
unsigned long lastUpdateTime = 0;
const unsigned long updateInterval = 30000; // 30 seconds

void setup() {
  Serial.begin(115200);
  Serial.println("\nStarting ESP32 VTrack Location Tracker with Google Geolocation...");

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println("\nConnected with IP: " + WiFi.localIP().toString());

  // Test server connection
  testServerConnection();

  // Initial location update
  updateLocation();
}

void loop() {
  // Check if it's time to update location
  if (millis() - lastUpdateTime >= updateInterval) {
    updateLocation();
    lastUpdateTime = millis();
  }

  delay(1000);
}

void updateLocation() {
  float lat, lon;

  // Get location from Google
  if (getLocationFromGoogle(lat, lon)) {
    // Send to Flask server
    sendLocationToFlaskServer(lat, lon);

    // Also send email as backup
    String locationLink = "Live Location: https://www.google.com/maps?q=" + String(lat, 6) + "," + String(lon, 6);
    sendEmail(locationLink);
  } else {
    Serial.println("Failed to get location");
  }
}

// Function to test server connection
void testServerConnection() {
  HTTPClient http;

  Serial.println("Testing connection to Flask server...");
  http.begin("http://" FLASK_SERVER_IP ":5003/health");

  int httpCode = http.GET();

  if (httpCode > 0) {
    String response = http.getString();
    Serial.println("Flask Server Test Response: " + response);
    Serial.println("Flask Server connection successful!");
  } else {
    Serial.println("Error connecting to Flask server: " + String(httpCode));
    Serial.println("Make sure the server is running and the IP address is correct.");
  }

  http.end();
}

// Function to get location using Google's Geolocation API
bool getLocationFromGoogle(float &lat, float &lon) {
  HTTPClient http;
  bool success = false;

  // Scan for WiFi networks
  Serial.println("Scanning for WiFi networks...");
  int networks = WiFi.scanNetworks();
  Serial.println("Scan completed. Found " + String(networks) + " networks");

  if (networks == 0) {
    Serial.println("No WiFi networks found. Cannot determine location.");
    return false;
  }

  // Create JSON payload for Google Geolocation API
  StaticJsonDocument<4096> doc;
  doc["considerIp"] = true;  // Also use IP-based location as fallback

  JsonArray wifiAccessPoints = doc.createNestedArray("wifiAccessPoints");

  // Add WiFi networks to the request (up to 15 networks)
  int count = min(networks, 15);
  for (int i = 0; i < count; i++) {
    JsonObject ap = wifiAccessPoints.createNestedObject();
    ap["macAddress"] = WiFi.BSSIDstr(i);
    ap["signalStrength"] = WiFi.RSSI(i);
    ap["channel"] = WiFi.channel(i);
  }

  String jsonPayload;
  serializeJson(doc, jsonPayload);

  Serial.println("Sending request to Google Geolocation API...");
  Serial.println("Payload size: " + String(jsonPayload.length()) + " bytes");

  // Use Google's Geolocation API
  http.begin("https://www.googleapis.com/geolocation/v1/geolocate?key=" GOOGLE_API_KEY);
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(jsonPayload);

  if (httpCode > 0) {
    String response = http.getString();
    Serial.println("Google API Response: " + response);

    // Parse JSON response
    StaticJsonDocument<512> respDoc;
    DeserializationError error = deserializeJson(respDoc, response);

    if (!error) {
      JsonObject location = respDoc["location"];
      lat = location["lat"];
      lon = location["lng"];

      Serial.println("Location - Lat: " + String(lat, 6) + ", Lon: " + String(lon, 6));
      Serial.println("Accuracy: " + String((float)respDoc["accuracy"]) + " meters");
      success = true;
    } else {
      Serial.println("Failed to parse location data: " + String(error.c_str()));
    }
  } else {
    Serial.println("Error fetching location data: " + String(httpCode));
    Serial.println("Error: " + http.errorToString(httpCode));
  }

  http.end();
  return success;
}

// Function to send location data to Flask server
void sendLocationToFlaskServer(float lat, float lon) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected. Reconnecting...");
    WiFi.reconnect();
    delay(5000);
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("Failed to reconnect to WiFi");
      return;
    }
  }

  HTTPClient http;

  // Create JSON payload
  StaticJsonDocument<200> doc;
  doc["deviceId"] = DEVICE_ID;
  doc["latitude"] = lat;
  doc["longitude"] = lon;
  doc["speed"] = 0; // We don't have speed data

  String jsonPayload;
  serializeJson(doc, jsonPayload);

  Serial.println("Sending location to Flask server...");
  Serial.println("URL: " FLASK_API_URL);
  Serial.println("Payload: " + jsonPayload);

  http.begin(FLASK_API_URL);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(jsonPayload);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Flask Server Response: " + response);
    Serial.println("Location sent successfully to Flask server!");
  } else {
    Serial.println("Error sending location to Flask server: " + String(httpResponseCode));
    Serial.println("Make sure the server is running and the endpoint is correct.");
  }

  http.end();
}

// Function to send email via SMTP
void sendEmail(String messageBody) {
  WiFiClientSecure client;
  client.setInsecure();  // Ignore SSL certificate

  Serial.println("Connecting to SMTP server...");
  if (!client.connect(SMTP_HOST, SMTP_PORT)) {
    Serial.println("SMTP Connection Failed!");
    return;
  }

  // SMTP Protocol for Sending Email
  String smtpCommands[] = {
    "EHLO esp32",
    "AUTH LOGIN",
    base64Encode(AUTHOR_EMAIL),
    base64Encode(AUTHOR_PASSWORD),
    "MAIL FROM:<" + String(AUTHOR_EMAIL) + ">",
    "RCPT TO:<" + String(RECIPIENT_EMAIL) + ">",
    "DATA",
    "Subject: ESP32 Location Alert\r\n",
    "From: ESP32 Tracker <" + String(AUTHOR_EMAIL) + ">\r\n",
    "To: <" + String(RECIPIENT_EMAIL) + ">\r\n",
    "Content-Type: text/plain; charset=utf-8\r\n",
    "\r\n" + messageBody + "\r\n.\r\n",
    "QUIT"
  };

  for (String command : smtpCommands) {
    client.println(command);
    delay(500);  // Wait for server response
  }

  Serial.println("Email Sent Successfully!");
  client.stop();
}

// Function to Encode Base64 (for SMTP Authentication)
String base64Encode(String input) {
  const char* base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  String encoded = "";
  int i = 0, j = 0;
  unsigned char array3[3], array4[4];

  for (size_t pos = 0; pos < input.length(); pos++) {
    array3[i++] = input[pos];
    if (i == 3) {
      array4[0] = (array3[0] & 0xfc) >> 2;
      array4[1] = ((array3[0] & 0x03) << 4) + ((array3[1] & 0xf0) >> 4);
      array4[2] = ((array3[1] & 0x0f) << 2) + ((array3[2] & 0xc0) >> 6);
      array4[3] = array3[2] & 0x3f;

      for (i = 0; i < 4; i++)
        encoded += base64_chars[array4[i]];
      i = 0;
    }
  }

  if (i) {
    for (j = i; j < 3; j++)
      array3[j] = '\0';

    array4[0] = (array3[0] & 0xfc) >> 2;
    array4[1] = ((array3[0] & 0x03) << 4) + ((array3[1] & 0xf0) >> 4);
    array4[2] = ((array3[1] & 0x0f) << 2) + ((array3[2] & 0xc0) >> 6);
    array4[3] = array3[2] & 0x3f;

    for (j = 0; j < i + 1; j++)
      encoded += base64_chars[array4[j]];

    while (i++ < 3)
      encoded += '=';
  }

  return encoded;
}
