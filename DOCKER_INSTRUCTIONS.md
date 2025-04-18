# Running the Vehicle Tracking App with Docker

This document provides instructions for running the Vehicle Tracking App in a Docker container to isolate it from other projects and prevent version conflicts.

## Prerequisites

- Docker
- Docker Compose

## Steps to Run with Docker

1. Make sure Docker and Docker Compose are installed on your system.

2. Open a terminal and navigate to the project directory.

3. Build the Docker image:
   ```bash
   docker-compose build
   ```

4. Start the container:
   ```bash
   docker-compose up -d
   ```

5. Access the application at:
   ```
   http://localhost:5500
   ```

6. To stop the container:
   ```bash
   docker-compose down
   ```

## Troubleshooting

If you encounter any issues:

1. Check Docker logs:
   ```bash
   docker-compose logs
   ```

2. Ensure ports are not in use:
   ```bash
   lsof -i :5500
   ```

3. Rebuild the container if dependencies change:
   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

## Benefits of Using Docker

- **Isolation**: The application runs in its own container with its own dependencies, preventing conflicts with other projects.
- **Consistency**: The same environment is used across different machines.
- **Version Control**: Specific versions of Node.js and npm packages are locked in the container.
- **Easy Setup**: One command to start the entire application stack.

## Docker Configuration Files

- **Dockerfile**: Defines how the application container is built.
- **docker-compose.yml**: Configures the services, networks, and volumes for the application.
- **.dockerignore**: Specifies which files should be excluded from the Docker build context.

These files are already set up in the project and configured to use the correct versions of all dependencies.
