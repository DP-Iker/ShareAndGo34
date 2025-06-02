# Etapa 1: Build
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copia solo lo necesario para cachear dependencias primero
COPY backend/pom.xml backend/.mvn/ backend/mvnw ./
RUN ./mvnw dependency:go-offline

# Copia el resto del código fuente
COPY backend .

# Compila la aplicación (sin tests para rapidez)
RUN ./mvnw clean package -DskipTests

# Etapa 2: Runtime
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copiamos solo el .jar generado
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

# Ejecuta la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
