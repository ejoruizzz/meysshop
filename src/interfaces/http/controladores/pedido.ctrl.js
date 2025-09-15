const crearPedido = require('../../../applicacion/pedido/crearPedido');
const historialPedidos = require('../../../applicacion/pedido/historialPedidos');
const cancelarPedido = require('../../../applicacion/pedido/cancelarPedido');

async function realizarPedido(req, res, next) {
  try {
    const pedido = await crearPedido(req.body);
    res.status(201).json(pedido);
  } catch (err) {
    next(err);
  }
}

async function obtenerHistorial(req, res, next) {
  try {
    const usuarioId = Number(req.params.usuarioId || req.query.usuarioId);
    const pedidos = await historialPedidos(usuarioId);
    res.json(pedidos);
  } catch (err) {
    next(err);
  }
}

async function cancelar(req, res, next) {
  try {
    const pedido = await cancelarPedido(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  realizarPedido,
  obtenerHistorial,
  cancelar,
};
