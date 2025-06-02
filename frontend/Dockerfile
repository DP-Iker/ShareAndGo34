# Etapa 1: Build de Vite
FROM node:20 AS builder
WORKDIR /app

# Copia e instala dependencias
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Copia el resto del código y construye
COPY frontend ./
RUN npm run build

# Etapa 2: Servir app compilada
FROM node:20-alpine
WORKDIR /app

# Instala un servidor estático simple
RUN npm install -g serve

# Copia archivos construidos
COPY --from=builder /app/dist ./dist

# Expone puerto y arranca
EXPOSE 3000
CMD ["serve", "dist"]
