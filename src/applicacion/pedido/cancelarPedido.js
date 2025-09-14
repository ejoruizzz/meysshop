const { pedidos, inventario } = require('./repositorioMemoria');
const { ESTADO_PEDIDO } = require('../comun/Tipos');

/**
 * Cancela un pedido existente y restaura el stock de inventario.
 * @param {number} pedidoId - Identificador del pedido.
 * @returns {Object|null} Pedido cancelado o null si no existe.
 */
function cancelarPedido(pedidoId) {
  const pedido = pedidos.find((p) => p.id === Number(pedidoId));
  if (!pedido || pedido.estado === ESTADO_PEDIDO.CANCELADO) {
    return null;
  }

  pedido.estado = ESTADO_PEDIDO.CANCELADO;
  for (const { productoId, cantidad } of pedido.items) {
    inventario[productoId] = (inventario[productoId] || 0) + cantidad;
  }
  return pedido;
}

module.exports = cancelarPedido;
