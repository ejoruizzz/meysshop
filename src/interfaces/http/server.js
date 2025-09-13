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

const helmet = require('helmet');


const productoRuta = require('./rutas/producto.ruta');

function crearServidor() {
  const app = express();

const fs = require('fs');
const path = require('path');

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

