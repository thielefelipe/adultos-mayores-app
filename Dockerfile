FROM node:24-alpine

WORKDIR /app/backend

# Copy all backend files
COPY backend/ .

# Install all dependencies (including dev for build)
RUN npm install --legacy-peer-deps

# Build with NestJS
RUN npm run build

# List dist to debug
RUN ls -la dist/

# Clean up dev dependencies
RUN npm prune --legacy-peer-deps --omit=dev

EXPOSE 3000
CMD ["node", "dist/main.js"]
