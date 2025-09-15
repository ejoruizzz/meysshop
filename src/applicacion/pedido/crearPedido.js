const { PedidoRepoSequelize } = require('../../infraestructura/repos/PedidoRepoSequelize');

/**
 * Crea un nuevo pedido para un usuario.
 * @param {Object} datos - Datos del pedido.
 * @param {number} datos.usuarioId - Identificador del usuario.
 * @param {Array<{productoId:number,cantidad:number}>} datos.items - Productos solicitados.
 * @returns {Promise<Object>} Pedido creado.
 */
async function crearPedido({ usuarioId, items }) {
  const repo = new PedidoRepoSequelize();
  return repo.crear({ usuarioId, items });
}

module.exports = crearPedido;
