FROM node:24-alpine

WORKDIR /app

COPY backend backend/
WORKDIR /app/backend

RUN npm install --legacy-peer-deps && npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
