const crearProductoUC = require('../../../applicacion/producto/crearProducto');
const listarProductoUC = require('../../../applicacion/producto/listarProducto');
const obtenerProductoUC = require('../../../applicacion/producto/obtenerProducto');
const { productoSchema } = require('../validadores/producto.val');

async function crear(req, res, next) {
  try {
    const datos = productoSchema.parse(req.body);
    const resultado = await crearProductoUC(datos);
    res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
}

async function listar(req, res, next) {
  try {
    const resultado = await listarProductoUC();
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

async function obtener(req, res, next) {
  try {
    const { id } = req.params;
    const resultado = await obtenerProductoUC(Number(id));
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

module.exports = { crear, listar, obtener };
