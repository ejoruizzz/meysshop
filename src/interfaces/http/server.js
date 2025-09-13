const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const productoRuta = require('./rutas/producto.ruta');

function crearServidor() {
  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  // Registro de rutas
  app.use('/api/productos', productoRuta);

  // Manejador de errores simple
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  });

  return app;
}

module.exports = { crearServidor };

