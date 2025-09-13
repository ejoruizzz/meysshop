const { ProductoRepoSequelize } = require('../../infraestructura/repos/ProductoRepoSequelize');

async function crearProducto(datos) {
  const repo = new ProductoRepoSequelize();
  return repo.crear(datos);
}

module.exports = { crearProducto };
