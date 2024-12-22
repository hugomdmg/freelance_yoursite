# Project

This repository contains the configuration to set up the complete project using Docker Compose. The project includes a web application developed in **React 18** and an API built with **Express** and **MongoDB**.

---

## Contents

- **APP**: runs at [http://localhost:3000].
- **API**: runs at [http://localhost:3001].
- **Scripts**: Docker Compose scripts to start the complete project.
- **Postman**: Postman collections to interact with the API.

---

## Prerequisites

Make sure you have the following programs installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js, nodemon, and npm](https://nodejs.org/) (to run the APP or the API separately if needed)
- [Postman](https://www.postman.com/downloads/) to test the collections.

---

### Main Scripts:

1. **Start the project with Docker Compose**:

The project can be started using the following scripts available in the `package.json` file:
- `npm run build`
- `npm run start`
- `npm run down`

2. **Start APP and API separately**:

To start the APP separately:
- `npm install`
- `npm run start`

To start the API separately:
- `npm install`
- `node index.js` or `nodemon index.js`

---

### Environment Variables:

#### APP (`.env` file in the APP directory):
- `REACT_APP_API_URL = 'http://localhost:3001'`
- `REACT_APP_ADMIN = 'admin'`

#### API (`.env` file in the API directory):
- `DB_NAME = "freelance"`
- `DB_URL = "mongodb://mongo_freelance:27017/freelance"`

---

### Postman Project

This repository contains the Postman collections to interact with the example API.

## Usage

1. Import the collection into Postman:
   - Open Postman and click on **Import**.
   - Select the file `freelance.postman_API.json` located in this repository.

2. Configure the necessary environments:
   - The `baseUrl` environment variable should have the value [http://localhost:3001].

3. Execute the requests as needed.
