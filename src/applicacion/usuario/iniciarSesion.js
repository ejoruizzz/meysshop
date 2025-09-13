const bcrypt = require('bcryptjs');
const db = require('../../infraestructura/orm/models');
const { generarToken } = require('./auth');

async function iniciarSesion({ email, password }) {
  const { Usuario, Rol } = db;
  const usuario = await Usuario.findOne({ where: { email }, include: { model: Rol, as: 'rol' } });
  if (!usuario) {
    throw new Error('Credenciales inválidas');
  }
  const valido = await bcrypt.compare(password, usuario.hash);
  if (!valido) {
    throw new Error('Credenciales inválidas');
  }
  const token = generarToken({ uid: usuario.id, rol: usuario.rol ? usuario.rol.nombre : null });
  return { token };
}

module.exports = { iniciarSesion };
