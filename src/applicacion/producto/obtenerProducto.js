const { ProductoRepoSequelize } = require('../../infraestructura/repos/ProductoRepoSequelize');

async function obtenerProducto(id) {
  const repo = new ProductoRepoSequelize();
  return repo.obtenerPorId(id);
}

module.exports = { obtenerProducto };
