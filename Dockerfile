FROM node:18-alpine

WORKDIR /app

# Set to development for hot reloading
ENV NODE_ENV=development

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 5500

# Command to run the app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5500"]
