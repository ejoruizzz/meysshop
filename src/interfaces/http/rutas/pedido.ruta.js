const express = require('express');
const router = express.Router();
const pedidoCtrl = require('../controladores/pedido.ctrl');
const { validarJWT } = require('../middlewares/validarJWT');

// Crear un pedido
router.post('/', validarJWT, pedidoCtrl.realizarPedido);

// Historial de pedidos de un usuario
router.get('/:usuarioId', validarJWT, pedidoCtrl.obtenerHistorial);

// Cancelar un pedido
router.delete('/:id', validarJWT, pedidoCtrl.cancelar);

module.exports = router;
