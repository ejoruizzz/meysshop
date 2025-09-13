const express = require('express');
const {
  crear,
  listar,
  obtener,
  actualizar,
  eliminar,
} = require('../controladores/producto.ctrl');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdmin } = require('../middlewares/esAdmin');

const router = express.Router();

router.post('/', validarJWT, esAdmin, crear);
router.get('/', listar);
router.get('/:id', obtener);
router.put('/:id', validarJWT, esAdmin, actualizar);
router.delete('/:id', validarJWT, esAdmin, eliminar);

module.exports = router;
