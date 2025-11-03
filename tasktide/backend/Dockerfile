# backend/Dockerfile

# Use official Node.js LTS image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire backend src
COPY . .

# Expose backend port
EXPOSE 5000

# Start server in dev mode (uses nodemon)
CMD ["npm", "run", "dev"]
