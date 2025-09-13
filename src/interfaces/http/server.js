const express = require('express');
const cors = require('cors');

const productoCtrl = require('./controladores/producto.ctrl');
const authCtrl = require('./controladores/auth.ctrl');
const pedidoCtrl = require('./controladores/pedido.ctrl');
const manejarErrores = require('./middlewares/manejarErrores');

function crearServidor() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post('/api/productos', productoCtrl.crear);
  app.get('/api/productos', productoCtrl.listar);
  app.get('/api/productos/:id', productoCtrl.obtener);

  app.post('/api/auth/registro', authCtrl.registrar);
  app.post('/api/auth/login', authCtrl.iniciar);

  app.post('/api/pedidos', pedidoCtrl.crear);

  app.use(manejarErrores);
  return app;
}

module.exports = { crearServidor };
