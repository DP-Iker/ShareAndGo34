# Etapa 1: Build de la app React
FROM node:20-alpine AS builder

# Crear y moverse al directorio de trabajo
WORKDIR /app

# Copiar dependencias y luego código fuente
COPY frontend/package*.json ./
RUN npm install

COPY frontend ./
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Copiar los archivos generados de React al contenido web de nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Configuración personalizada de Nginx (ver abajo)
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
