# Build stage
FROM node:24-alpine as builder

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --legacy-peer-deps

COPY backend .
RUN npm run build

# Runtime stage
FROM node:24-alpine

WORKDIR /app/backend
COPY --from=builder /app/backend/dist ./dist
COPY backend/package*.json ./
RUN npm install --legacy-peer-deps --only=production

EXPOSE 3000
CMD ["node", "dist/main"]
