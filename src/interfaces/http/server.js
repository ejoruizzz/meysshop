const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');

function crearServidor() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  // Cargar rutas
  const rutasDir = path.join(__dirname, 'rutas');
  if (fs.existsSync(rutasDir)) {
    fs.readdirSync(rutasDir)
      .filter((archivo) => archivo.endsWith('.ruta.js'))
      .forEach((archivo) => {
        const ruta = require(path.join(rutasDir, archivo));
        const router = ruta.router || ruta.default || ruta;
        if (router) {
          app.use(router);
        }
      });
  }

  return app;
}

module.exports = { crearServidor };
