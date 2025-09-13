
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
