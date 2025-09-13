const Usuario = require('../../dominio/entidades/Usuario');

function aEntidad(row) {
  if (!row) return null;
  const { id, nombre, email, hash, rolId = null, rol = null } = row;
  return new Usuario({ id, nombre, email, hash, rolId, rol });
}

function aPersistencia(obj) {
  if (obj instanceof Usuario) {
    return { id: obj.id, nombre: obj.nombre, email: obj.email, hash: obj.hash, rolId: obj.rolId };
  }
  const { id = null, nombre, email, hash, rolId = null } = obj;
  return { id, nombre, email, hash, rolId };
}

module.exports = { aEntidad, aPersistencia };
