
const registrarUsuario = require('../../../applicacion/usuario/registrarUsuario');
const iniciarSesion = require('../../../applicacion/usuario/iniciarSesion');
const { usuarioRegistroSchema, usuarioLoginSchema } = require('../validadores/usuario.val');

async function registrar(req, res, next) {
  try {
    const datos = usuarioRegistroSchema.parse(req.body);
    const resultado = await registrarUsuario(datos);
    res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
}

async function iniciar(req, res, next) {
  try {
    const credenciales = usuarioLoginSchema.parse(req.body);
    const resultado = await iniciarSesion(credenciales);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

module.exports = { registrar, iniciar };

const express = require('express');
const { registrarUsuario } = require('../../../applicacion/usuario/registrarUsuario');
const { iniciarSesion } = require('../../../applicacion/usuario/iniciarSesion');

const router = express.Router();

router.post('/registro', async (req, res, next) => {
  try {
    const usuario = await registrarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (e) {
    next(e);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const resultado = await iniciarSesion(req.body);
    res.json(resultado);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
