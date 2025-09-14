const { inventario, pedidos, generarId } = require('./repositorioMemoria');
const { ESTADO_PEDIDO } = require('../comun/Tipos');
const { ErrorDeValidacion } = require('../comun/Excepciones');

/**
 * Crea un nuevo pedido para un usuario y descuenta el stock de los productos.
 * @param {Object} datos - Datos del pedido.
 * @param {number} datos.usuarioId - Identificador del usuario.
 * @param {Array<{productoId:number,cantidad:number}>} datos.items - Productos solicitados.
 * @returns {Object} Pedido creado.
 */
function crearPedido({ usuarioId, items }) {
  if (!usuarioId) {
    throw new ErrorDeValidacion('usuarioId es requerido');
  }
  if (!Array.isArray(items) || items.length === 0) {
    throw new ErrorDeValidacion('items es requerido');
  }

  // Verificar stock disponible
  for (const { productoId, cantidad } of items) {
    const stock = inventario[productoId] || 0;
    if (cantidad > stock) {
      throw new ErrorDeValidacion(`Stock insuficiente para el producto ${productoId}`);
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
    estado: ESTADO_PEDIDO.CREADO,
    creadoEn: new Date(),
  };

  pedidos.push(pedido);
  return pedido;
}

module.exports = crearPedido;
