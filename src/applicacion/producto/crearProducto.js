
const { ProductoRepoSequelize } = require('../../infraestructura/repos/ProductoRepoSequelize');


// Caso de uso: crear un nuevo producto
const { ProductoRepoSequelize } = require('../../infraestructura/repos/ProductoRepoSequelize');

/**
 * Crea un producto usando el repositorio de Sequelize
 * @param {Object} datos Información del producto
 * @returns {Promise<Object>} Producto creado
 */

async function crearProducto(datos) {
  const repo = new ProductoRepoSequelize();
  return repo.crear(datos);
}

module.exports = { crearProducto };
