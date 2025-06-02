# Etapa de construcción
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copiar dependencias y compilar
COPY backend/pom.xml .
COPY backend/src ./src

RUN mvn clean package -DskipTests

# Etapa de ejecución
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
