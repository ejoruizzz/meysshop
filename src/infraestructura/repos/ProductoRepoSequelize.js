// src/infraestructura/repos/ProductoRepoSequelize.js
const { db } = require('../orm');

class ProductoRepoSequelize {
  async crear(datos) {
    const creado = await db.Producto.create(datos);
    return creado.toJSON();
  }
  async obtenerPorId(id) {
    const p = await db.Producto.findByPk(id, {
      include: [{ model: db.Inventario, as: 'inventario' }, { model: db.Categoria, as: 'categoria' }]
    });
    return p ? p.toJSON() : null;
  }
  async listar() {
    const productos = await db.Producto.findAll({
      include: [
        { model: db.Inventario, as: 'inventario' },
        { model: db.Categoria, as: 'categoria' }
      ]
    });
    return productos.map(p => p.toJSON());
  }

  async actualizar(id, datos) {
    const [actualizados] = await db.Producto.update(datos, { where: { id } });
    if (!actualizados) return null;
    return this.obtenerPorId(id);
  }

  async eliminar(id) {
    const eliminados = await db.Producto.destroy({ where: { id } });
    return eliminados > 0;
  }
}

module.exports = { ProductoRepoSequelize };
