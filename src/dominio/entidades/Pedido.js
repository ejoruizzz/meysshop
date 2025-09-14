const { ESTADO_PEDIDO } = require('../../applicacion/comun/Tipos');
const { ErrorDeValidacion } = require('../../applicacion/comun/Excepciones');

class Pedido {
  constructor({ id = null, usuarioId, items, estado = ESTADO_PEDIDO.CREADO, creadoEn = new Date() }) {
    if (!usuarioId) {
      throw new ErrorDeValidacion('usuarioId requerido');
    }
    if (!Array.isArray(items) || items.length === 0) {
      throw new ErrorDeValidacion('items es requerido');
    }
    for (const item of items) {
      if (!item.productoId || typeof item.cantidad !== 'number' || item.cantidad <= 0) {
        throw new ErrorDeValidacion('Item de pedido inválido');
      }
    }
    this.id = id;
    this.usuarioId = usuarioId;
    this.items = items.map((i) => ({ ...i }));
    this.estado = estado;
    this.creadoEn = creadoEn;
  }

  cancelar() {
    if (this.estado !== ESTADO_PEDIDO.CANCELADO) {
      this.estado = ESTADO_PEDIDO.CANCELADO;
    }
  }

  toJSON() {
    return {
      id: this.id,
      usuarioId: this.usuarioId,
      items: this.items,
      estado: this.estado,
      creadoEn: this.creadoEn,
    };
  }
}

module.exports = Pedido;
