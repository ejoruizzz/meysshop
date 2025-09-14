const bcrypt = require('bcryptjs');
const db = require('../../infraestructura/orm/models');
const { generarToken } = require('./auth');
const { ErrorDeAplicacion } = require('../comun/Excepciones');

async function iniciarSesion({ email, password }) {
  const { Usuario, Rol } = db;
  const usuario = await Usuario.findOne({ where: { email }, include: { model: Rol, as: 'rol' } });
  if (!usuario) {
    throw new ErrorDeAplicacion('Credenciales inválidas', 401);
  }
  const valido = await bcrypt.compare(password, usuario.hash);
  if (!valido) {
    throw new ErrorDeAplicacion('Credenciales inválidas', 401);
  }
  const token = generarToken({ uid: usuario.id, rol: usuario.rol ? usuario.rol.nombre : null });
  return { token };
}

module.exports = iniciarSesion;
