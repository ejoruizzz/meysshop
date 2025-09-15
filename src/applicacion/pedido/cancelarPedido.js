const { PedidoRepoSequelize } = require('../../infraestructura/repos/PedidoRepoSequelize');

/**
 * Cancela un pedido existente y restaura el stock de inventario.
 * @param {number} pedidoId - Identificador del pedido.
 * @returns {Promise<Object|null>} Pedido cancelado o null si no existe.
 */
async function cancelarPedido(pedidoId) {
  const repo = new PedidoRepoSequelize();
  return repo.cancelar(pedidoId);
}

module.exports = cancelarPedido;
