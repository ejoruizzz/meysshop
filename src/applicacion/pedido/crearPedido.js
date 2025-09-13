const { inventario, pedidos, generarId } = require('./repositorioMemoria');

/**
 * Crea un nuevo pedido para un usuario y descuenta el stock de los productos.
 * @param {Object} datos - Datos del pedido.
 * @param {number} datos.usuarioId - Identificador del usuario.
 * @param {Array<{productoId:number,cantidad:number}>} datos.items - Productos solicitados.
 * @returns {Object} Pedido creado.
 */
function crearPedido({ usuarioId, items }) {
  if (!usuarioId) {
    throw new Error('usuarioId es requerido');
  }
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('items es requerido');
  }

  // Verificar stock disponible
  for (const { productoId, cantidad } of items) {
    const stock = inventario[productoId] || 0;
    if (cantidad > stock) {
      throw new Error(`Stock insuficiente para el producto ${productoId}`);
    }
  }

  // Descontar stock
  for (const { productoId, cantidad } of items) {
    inventario[productoId] = (inventario[productoId] || 0) - cantidad;
  }

  const pedido = {
    id: generarId(),
    usuarioId,
    items: items.map((i) => ({ ...i })),
    estado: 'creado',
    creadoEn: new Date(),
  };

  pedidos.push(pedido);
  return pedido;
}

module.exports = crearPedido;

module.exports = async function crearPedido(datos) {
  return { id: 1, ...datos };
};

