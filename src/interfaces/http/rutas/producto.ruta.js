const express = require('express');
const {
  crearProductoCtrl,
  obtenerProductoCtrl,
  listarProductoCtrl,
  actualizarProductoCtrl,
  eliminarProductoCtrl
} = require('../controladores/producto.ctrl');

const router = express.Router();

router.post('/', crearProductoCtrl);
router.get('/', listarProductoCtrl);
router.get('/:id', obtenerProductoCtrl);
router.put('/:id', actualizarProductoCtrl);
router.delete('/:id', eliminarProductoCtrl);

module.exports = router;
