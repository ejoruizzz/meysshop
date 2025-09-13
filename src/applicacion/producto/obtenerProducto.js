// Caso de uso: obtener un producto por su ID
const { ProductoRepoSequelize } = require('../../infraestructura/repos/ProductoRepoSequelize');

/**
 * Obtiene un producto
 * @param {number} id Identificador del producto
 * @returns {Promise<Object|null>} Producto encontrado o null
 */
async function obtenerProducto(id) {
  const repo = new ProductoRepoSequelize();
  return repo.obtenerPorId(id);
}

module.exports = { obtenerProducto };
