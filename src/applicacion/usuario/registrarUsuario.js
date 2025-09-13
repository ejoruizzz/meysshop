
const bcrypt = require('bcryptjs');
const db = require('../../infraestructura/orm/models');

async function registrarUsuario({ nombre, email, password, rol = 'cliente' }) {
  const { Usuario, Rol } = db;
  const existente = await Usuario.findOne({ where: { email } });
  if (existente) {
    throw new Error('Email ya registrado');
  }
  const rolInst = await Rol.findOne({ where: { nombre: rol } });
  const rolId = rolInst ? rolInst.id : null;
  const hash = await bcrypt.hash(password, 10);
  const usuario = await Usuario.create({ nombre, email, hash, rolId });
  return { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: rolInst ? rolInst.nombre : null };
}

module.exports = registrarUsuario;

