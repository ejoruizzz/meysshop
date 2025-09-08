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
  // ...
}

module.exports = { ProductoRepoSequelize };
