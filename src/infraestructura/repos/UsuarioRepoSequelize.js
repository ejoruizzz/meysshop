const { db } = require('../orm');
const usuarioMap = require('../mapeadores/usuario.mapper');

class UsuarioRepoSequelize {
  async crear(datos) {
    const creado = await db.Usuario.create(usuarioMap.aPersistencia(datos));
    return this.obtenerPorId(creado.id);
  }

  async obtenerPorId(id) {
    const u = await db.Usuario.findByPk(id, { include: { model: db.Rol, as: 'rol' } });
    return u ? usuarioMap.aEntidad(u.toJSON()) : null;
  }

  async obtenerPorEmail(email) {
    const u = await db.Usuario.findOne({ where: { email }, include: { model: db.Rol, as: 'rol' } });
    return u ? usuarioMap.aEntidad(u.toJSON()) : null;
  }

  async listar() {
    const usuarios = await db.Usuario.findAll({ include: { model: db.Rol, as: 'rol' } });
    return usuarios.map((u) => usuarioMap.aEntidad(u.toJSON()));
  }

  async actualizar(id, datos) {
    const [actualizados] = await db.Usuario.update(usuarioMap.aPersistencia(datos), { where: { id } });
    if (!actualizados) return null;
    return this.obtenerPorId(id);
  }

  async eliminar(id) {
    const eliminados = await db.Usuario.destroy({ where: { id } });
    return eliminados > 0;
  }
}

module.exports = { UsuarioRepoSequelize };
