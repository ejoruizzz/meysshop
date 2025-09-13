const { verificarToken } = require('../../../applicacion/usuario/auth');

function validarJWT(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  try {
    const payload = verificarToken(token);
    req.usuario = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = { validarJWT };
