#!/bin/bash

# Stop Coinarth containers if they're running (uncomment if needed)
# docker-compose -f /path/to/coinarth/docker-compose.yml down

# Make sure any old VTrack containers are stopped
docker compose down

# Rebuild and start VTrack containers
docker compose build
docker compose up -d

# Show running containers
docker ps

echo "VTrack is now running at http://localhost:5500"
echo "To stop VTrack, run ./vtrack-stop.sh"
