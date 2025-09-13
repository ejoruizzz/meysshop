const express = require('express');
const { registrar, iniciar } = require('../controladores/auth.ctrl');

const router = express.Router();

router.post('/registro', registrar);
router.post('/login', iniciar);

module.exports = router;

