const { ZodError } = require('zod');

function manejarErrores(err, req, res, next) {
  if (err instanceof ZodError) {
    const errores = err.errors.map(e => ({ campo: e.path.join('.'), mensaje: e.message }));
    return res.status(400).json({ codigo: 'VALIDATION_ERROR', errores });
  }

  const codigo = err.status || 500;
  const mensaje = err.message || 'Error interno del servidor';
  return res.status(codigo).json({ codigo, mensaje });
}

module.exports = manejarErrores;
