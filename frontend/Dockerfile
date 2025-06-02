# Etapa 1: Build de la app Vite
FROM node:20-alpine AS builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend ./
RUN npm run build

# Etapa 2: Servir con 'serve'
FROM node:20-alpine

WORKDIR /app
RUN npm install --legacy-peer-deps
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
