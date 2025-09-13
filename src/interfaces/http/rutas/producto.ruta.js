const express = require('express');
const {
  crear,
  listar,
  obtener,
  actualizar,
  eliminar,
} = require('../controladores/producto.ctrl');

const router = express.Router();

router.post('/', crear);
router.get('/', listar);
router.get('/:id', obtener);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

module.exports = router;
