# Etapa de build
FROM node:18-alpine AS build

# Setea directorio de trabajo
WORKDIR /app

# Copia archivos necesarios
COPY package*.json ./

# Instala dependencias ignorando conflictos de peerDependencies
RUN npm install --legacy-peer-deps

# Copia el resto del código
COPY . .

# Construye la app (ajusta según tu framework: Vite, Next, CRA...)
RUN npm run build

# Etapa de producción con nginx
FROM nginx:alpine

# Copia build al contenedor final
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto (por defecto es 80)
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
