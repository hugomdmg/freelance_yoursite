# Usar una imagen base de Node.js LTS
FROM node:20

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /APP

# Copiar los archivos necesarios para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias (modo de producción para evitar dependencias de desarrollo)
RUN npm install --omit=dev

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto que la aplicación va a utilizar
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
