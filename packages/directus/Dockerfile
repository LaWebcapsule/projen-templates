FROM node:22-bookworm-slim

# Update npm to fix dependencies
RUN npm install -g npm@11.8.0

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json /app/

# Set working directory
WORKDIR /app


# Install dependencies - without dev dependencies
RUN NODE_ENV=production npm install

# Cleaning benchmarks folder in tedious module for security
RUN rm -rf node_modules/tedious/benchmarks

# Copy the rest of the application code
COPY . .

# Start Directus server
CMD ["npx", "directus", "start"]
