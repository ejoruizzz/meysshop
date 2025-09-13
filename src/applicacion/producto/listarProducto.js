const { ProductoRepoSequelize } = require('../../infraestructura/repos/ProductoRepoSequelize');

// Caso de uso: listar todos los productos
/**
 * Lista todos los productos existentes
 * @returns {Promise<Array>} Lista de productos
 */

async function listarProducto() {
  const repo = new ProductoRepoSequelize();
  return repo.listar();
}

module.exports = listarProducto;
