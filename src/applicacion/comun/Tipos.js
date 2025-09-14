const ESTADO_PEDIDO = Object.freeze({
  CREADO: 'creado',
  CANCELADO: 'cancelado',
});

const ROLES_USUARIO = Object.freeze({
  ADMIN: 'admin',
  CLIENTE: 'cliente',
});

module.exports = {
  ESTADO_PEDIDO,
  ROLES_USUARIO,
};
