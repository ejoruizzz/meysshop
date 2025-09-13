const { pedidos } = require('./repositorioMemoria');

/**
 * Devuelve el historial de pedidos de un usuario.
 * @param {number} usuarioId - Identificador del usuario.
 * @returns {Array<Object>} Lista de pedidos del usuario.
 */
function historialPedidos(usuarioId) {
  return pedidos.filter((p) => p.usuarioId === usuarioId);
}

module.exports = historialPedidos;
