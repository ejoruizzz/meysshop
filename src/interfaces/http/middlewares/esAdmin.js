const { ROLES_USUARIO } = require('../../applicacion/comun/Tipos');

function esAdmin(req, res, next) {
  if (req.usuario && req.usuario.rol === ROLES_USUARIO.ADMIN) {
    return next();
  }
  return res.status(403).json({ error: 'Acceso denegado' });
}

module.exports = { esAdmin };
