const { ProductoRepoSequelize } = require('../../infraestructura/repos/ProductoRepoSequelize');

async function listarProducto() {
  const repo = new ProductoRepoSequelize();
  return repo.listar();
}

module.exports = { listarProducto };
