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
