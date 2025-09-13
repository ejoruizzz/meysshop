const { pedidos, inventario } = require('./repositorioMemoria');

/**
 * Cancela un pedido existente y restaura el stock de inventario.
 * @param {number} pedidoId - Identificador del pedido.
 * @returns {Object|null} Pedido cancelado o null si no existe.
 */
function cancelarPedido(pedidoId) {
  const pedido = pedidos.find((p) => p.id === Number(pedidoId));
  if (!pedido || pedido.estado === 'cancelado') {
    return null;
  }

  pedido.estado = 'cancelado';
  for (const { productoId, cantidad } of pedido.items) {
    inventario[productoId] = (inventario[productoId] || 0) + cantidad;
  }
  return pedido;
}

module.exports = cancelarPedido;
