const crearPedido = require('../../../applicacion/pedido/crearPedido');
const historialPedidos = require('../../../applicacion/pedido/historialPedidos');
const cancelarPedido = require('../../../applicacion/pedido/cancelarPedido');

async function realizarPedido(req, res) {
  try {
    const pedido = crearPedido(req.body);
    res.status(201).json(pedido);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function obtenerHistorial(req, res) {
  const usuarioId = Number(req.params.usuarioId || req.query.usuarioId);
  const pedidos = historialPedidos(usuarioId);
  res.json(pedidos);
}

async function cancelar(req, res) {
  const pedido = cancelarPedido(req.params.id);
  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }
  res.json(pedido);
}

module.exports = {
  realizarPedido,
  obtenerHistorial,
  cancelar,
};
=======
const crearPedidoUC = require('../../../applicacion/pedido/crearPedido');
const { pedidoSchema } = require('../validadores/pedido.val');

async function crear(req, res, next) {
  try {
    const datos = pedidoSchema.parse(req.body);
    const resultado = await crearPedidoUC(datos);
    res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
}

module.exports = { crear };
