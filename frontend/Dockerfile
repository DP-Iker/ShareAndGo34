# Etapa 1: Build
FROM node:20 AS builder

WORKDIR /app

# Copia solo los archivos de dependencias primero (para aprovechar cache)
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Copia el resto del proyecto
COPY frontend/ ./

# Compila el proyecto
RUN npm run build

# Etapa 2: Servir con 'serve'
FROM node:20 AS runner

WORKDIR /app

# Instala un servidor estático simple
RUN npm install -g serve

# Copia los archivos estáticos compilados desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Expone el puerto que 'serve' usará
EXPOSE 3000

# Comando para arrancar el servidor
CMD ["serve", "-s", "dist", "-l", "3000"]
