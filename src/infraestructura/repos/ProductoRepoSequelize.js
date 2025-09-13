// src/infraestructura/repos/ProductoRepoSequelize.js
const { db } = require('../orm');
const productoMap = require('../mapeadores/producto.mapper');

class ProductoRepoSequelize {
  async crear(datos) {
    const creado = await db.Producto.create(productoMap.aPersistencia(datos));
    return this.obtenerPorId(creado.id);
  }

  async obtenerPorId(id) {
    const p = await db.Producto.findByPk(id, {
      include: [{ model: db.Inventario, as: 'inventario' }, { model: db.Categoria, as: 'categoria' }]
    });
    return p ? productoMap.aEntidad(p.toJSON()) : null;
  }

  async listar() {
    const productos = await db.Producto.findAll({
      include: [
        { model: db.Inventario, as: 'inventario' },
        { model: db.Categoria, as: 'categoria' }
      ]
    });
    return productos.map((p) => productoMap.aEntidad(p.toJSON()));
  }

  async actualizar(id, datos) {
    const [actualizados] = await db.Producto.update(productoMap.aPersistencia(datos), { where: { id } });
    if (!actualizados) return null;
    return this.obtenerPorId(id);
  }

  async eliminar(id) {
    const eliminados = await db.Producto.destroy({ where: { id } });
    return eliminados > 0;
  }
}

module.exports = { ProductoRepoSequelize };
