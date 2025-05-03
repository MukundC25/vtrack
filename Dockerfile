FROM node:18-alpine AS builder

WORKDIR /app

# Set environment variables to optimize Node.js
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with exact versions
RUN npm ci --quiet

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage - use a smaller image
FROM node:18-alpine

WORKDIR /app

# Install a simple HTTP server to serve the static content
RUN npm install -g serve@14.2.1

# Copy only the built files from the builder stage
COPY --from=builder /app/dist /app/dist

# Set a specific hostname to avoid conflicts
ENV HOSTNAME=vtrack-container

# Expose the port the app runs on
EXPOSE 5500

# Command to run the app with specific options
CMD ["serve", "-s", "dist", "-l", "5500", "--no-clipboard", "--no-port-switching"]
