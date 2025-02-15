# Use an official Node.js runtime as a parent image
FROM node:20.15.1

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if exists)
COPY package*.json ./

# Install the dependencies
RUN npm install --fetch-timeout=180000

# Copy the rest of the application code
COPY . .
# Install the dependencies with a longer timeout

# Build the application
RUN npm run build

# Expose port 5173 (default Vite dev server port)
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
