const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const productoRuta = require('./rutas/producto.ruta');
const authRuta = require('./rutas/auth.ruta');
const pedidoRuta = require('./rutas/pedido.ruta');

function crearServidor() {
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.use('/api/productos', productoRuta);
  app.use('/api/auth', authRuta);
  app.use('/api/pedidos', pedidoRuta);

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  });

  return app;
}

module.exports = { crearServidor };

