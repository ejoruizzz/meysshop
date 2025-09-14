const Pedido = require('../../dominio/entidades/Pedido');
const { ESTADO_PEDIDO } = require('../../applicacion/comun/Tipos');

let pedidos = [];
let ultimoId = 0;

class PedidoRepoSequelize {
  async crear(datos) {
    const pedido = new Pedido({ ...datos, id: ++ultimoId });
    pedidos.push(pedido);
    return pedido;
  }

  async obtenerPorId(id) {
    return pedidos.find((p) => p.id === Number(id)) || null;
  }

  async listarPorUsuario(usuarioId) {
    return pedidos.filter((p) => p.usuarioId === Number(usuarioId));
  }

  async cancelar(id) {
    const pedido = await this.obtenerPorId(id);
    if (!pedido || pedido.estado === ESTADO_PEDIDO.CANCELADO) {
      return null;
    }
    pedido.cancelar();
    return pedido;
  }
}

module.exports = { PedidoRepoSequelize };
