const crypto = require('crypto');
const { ErrorDeAplicacion } = require('../comun/Excepciones');

const SECRET = process.env.JWT_SECRETO || 'secreto';

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function generarToken(payload, expSegundos = 3600) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expSegundos;
  const data = { ...payload, exp };
  const partes = [base64url(JSON.stringify(header)), base64url(JSON.stringify(data))];
  const firma = crypto
    .createHmac('sha256', SECRET)
    .update(partes.join('.'))
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  partes.push(firma);
  return partes.join('.');
}

function verificarToken(token) {
  const [h, p, f] = token.split('.');
  if (!h || !p || !f) throw new ErrorDeAplicacion('Token inválido', 401);
  const firma = crypto
    .createHmac('sha256', SECRET)
    .update(`${h}.${p}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  if (firma !== f) throw new ErrorDeAplicacion('Firma no válida', 401);
  const payload = JSON.parse(Buffer.from(p, 'base64').toString());
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new ErrorDeAplicacion('Token expirado', 401);
  }
  return payload;
}

module.exports = { generarToken, verificarToken };
