
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

// Controladores HTTP para productos
const { crearProducto } = require('../../../applicacion/producto/crearProducto');
const { obtenerProducto } = require('../../../applicacion/producto/obtenerProducto');
const { listarProducto } = require('../../../applicacion/producto/listarProducto');
const { ProductoRepoSequelize } = require('../../../infraestructura/repos/ProductoRepoSequelize');

async function crearProductoCtrl(req, res, next) {
  try {
    const producto = await crearProducto(req.body);
    res.status(201).json(producto);
  } catch (e) {
    next(e);
  }
}

async function obtenerProductoCtrl(req, res, next) {
  try {
    const producto = await obtenerProducto(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (e) {
    next(e);
  }
}

async function listarProductoCtrl(req, res, next) {
  try {
    const productos = await listarProducto();
    res.json(productos);
  } catch (e) {
    next(e);
  }
}

async function actualizarProductoCtrl(req, res, next) {
  try {
    const repo = new ProductoRepoSequelize();
    const producto = await repo.actualizar(req.params.id, req.body);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (e) {
    next(e);
  }
}

async function eliminarProductoCtrl(req, res, next) {
  try {
    const repo = new ProductoRepoSequelize();
    const eliminado = await repo.eliminar(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
}

module.exports = {
  crearProductoCtrl,
  obtenerProductoCtrl,
  listarProductoCtrl,
  actualizarProductoCtrl,
  eliminarProductoCtrl
};

