const { PedidoRepoSequelize } = require('../../infraestructura/repos/PedidoRepoSequelize');

/**
 * Devuelve el historial de pedidos de un usuario.
 * @param {number} usuarioId - Identificador del usuario.
 * @returns {Promise<Array<Object>>} Lista de pedidos del usuario.
 */
async function historialPedidos(usuarioId) {
  const repo = new PedidoRepoSequelize();
  return repo.listarPorUsuario(usuarioId);
}

module.exports = historialPedidos;
