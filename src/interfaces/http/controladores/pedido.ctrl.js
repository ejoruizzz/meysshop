const crearPedido = require('../../../applicacion/pedido/crearPedido');
const historialPedidos = require('../../../applicacion/pedido/historialPedidos');
const cancelarPedido = require('../../../applicacion/pedido/cancelarPedido');
const { pedidoSchema } = require('../validadores/pedido.val');

async function realizarPedido(req, res, next) {
  try {
    const datos = pedidoSchema.parse(req.body);
    const nuevoPedido = await crearPedido(datos);
    res.status(201).json(nuevoPedido);
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
    const pedidoCancelado = await cancelarPedido(req.params.id);
    if (!pedidoCancelado) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedidoCancelado);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  realizarPedido,
  obtenerHistorial,
  cancelar,
};
