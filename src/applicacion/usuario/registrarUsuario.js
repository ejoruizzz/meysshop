const bcrypt = require('bcryptjs');
const db = require('../../infraestructura/orm/models');
const { ROLES_USUARIO } = require('../comun/Tipos');
const { ErrorDeAplicacion } = require('../comun/Excepciones');

async function registrarUsuario({ nombre, email, password, rol = ROLES_USUARIO.CLIENTE }) {
  const { Usuario, Rol } = db;
  const existente = await Usuario.findOne({ where: { email } });
  if (existente) {
    throw new ErrorDeAplicacion('Email ya registrado', 409);
  }
  const rolInst = await Rol.findOne({ where: { nombre: rol } });
  const rolId = rolInst ? rolInst.id : null;
  const hash = await bcrypt.hash(password, 10);
  const usuario = await Usuario.create({ nombre, email, hash, rolId });
  return { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: rolInst ? rolInst.nombre : null };
}

module.exports = registrarUsuario;
