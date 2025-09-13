const crearProductoUC = require('../../../applicacion/producto/crearProducto');
const listarProductoUC = require('../../../applicacion/producto/listarProducto');
const obtenerProductoUC = require('../../../applicacion/producto/obtenerProducto');
const { ProductoRepoSequelize } = require('../../../infraestructura/repos/ProductoRepoSequelize');
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

async function actualizar(req, res, next) {
  try {
    const repo = new ProductoRepoSequelize();
    const producto = await repo.actualizar(req.params.id, req.body);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (err) {
    next(err);
  }
}

async function eliminar(req, res, next) {
  try {
    const repo = new ProductoRepoSequelize();
    const eliminado = await repo.eliminar(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = { crear, listar, obtener, actualizar, eliminar };

