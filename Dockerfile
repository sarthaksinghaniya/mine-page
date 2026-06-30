# === Stage 1: Build the React/Three.js Application ===
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies (utilizing Docker layer caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy raw source code
COPY . .

# Execute Production Build (Vite/Webpack)
RUN npm run build

# === Stage 2: Serve via Nginx ===
FROM nginx:alpine

# Copy the build output to Nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration for React Router fallback
# (Assuming a custom nginx.conf would be placed here if needed)

# Expose standard web port
EXPOSE 80

# Start Nginx daemon
CMD ["nginx", "-g", "daemon off;"]
