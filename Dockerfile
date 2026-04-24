FROM node:24-alpine

WORKDIR /app

# Copy backend files
COPY backend/package*.json ./backend/
COPY backend/src ./backend/src
COPY backend/tsconfig*.json ./backend/
COPY backend/nest-cli.json ./backend/

# Install dependencies
WORKDIR /app/backend
RUN npm install --legacy-peer-deps

# Build
RUN npm run build

# Remove dev dependencies
RUN npm install --legacy-peer-deps --only=production

EXPOSE 3000
CMD ["node", "./dist/main"]
