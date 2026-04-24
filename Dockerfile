FROM node:24-alpine

WORKDIR /app/backend

COPY backend/package*.json ./
COPY backend/tsconfig.json ./
COPY backend/tsconfig.build.json ./
COPY backend/nest-cli.json ./
COPY backend/src ./src

RUN npm install --legacy-peer-deps
RUN npm run build
RUN echo "=== Checking dist folder ===" && ls -la dist/ && echo "=== dist/main.js exists ===" && ls -la dist/main.js

EXPOSE 3000
CMD ["node", "dist/main.js"]
