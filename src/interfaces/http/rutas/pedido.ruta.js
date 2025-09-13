const express = require('express');
const router = express.Router();
const pedidoCtrl = require('../controladores/pedido.ctrl');

// Crear un pedido
router.post('/', pedidoCtrl.realizarPedido);

// Historial de pedidos de un usuario
router.get('/:usuarioId', pedidoCtrl.obtenerHistorial);

// Cancelar un pedido
router.delete('/:id', pedidoCtrl.cancelar);

module.exports = router;
