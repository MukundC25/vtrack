#!/bin/bash

# Stop VTrack containers
docker compose down

# Show running containers
docker ps

echo "VTrack has been stopped"
echo "You can now safely start other Docker projects"
