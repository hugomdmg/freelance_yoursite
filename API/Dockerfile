# Usar una imagen base de Node.js LTS
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /API

# Copiar archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --omit=dev

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto en el que la API escuchará
EXPOSE 3001

# Instalar concurrently si aún no está instalado (esto se podría hacer en el package.json)
RUN npm install concurrently --save-dev

# Comando para iniciar la API y seed.js al mismo tiempo usando concurrently
CMD ["npx", "concurrently", "\"npx nodemon index.js\"", "\"node src/infrastructure/seed.js\""]


