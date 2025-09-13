class Pedido {
  constructor({ id = null, usuarioId, items, estado = 'creado', creadoEn = new Date() }) {
    if (!usuarioId) {
      throw new Error('usuarioId requerido');
    }
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('items es requerido');
    }
    for (const item of items) {
      if (!item.productoId || typeof item.cantidad !== 'number' || item.cantidad <= 0) {
        throw new Error('Item de pedido inválido');
      }
    }
    this.id = id;
    this.usuarioId = usuarioId;
    this.items = items.map((i) => ({ ...i }));
    this.estado = estado;
    this.creadoEn = creadoEn;
  }

  cancelar() {
    if (this.estado !== 'cancelado') {
      this.estado = 'cancelado';
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
