const Pedido = require('../../dominio/entidades/Pedido');
const { ESTADO_PEDIDO } = require('../../applicacion/comun/Tipos');
const { ErrorDeValidacion } = require('../../applicacion/comun/Excepciones');
const { db } = require('../orm');

function aEntidad(pedidoDb) {
  const data = pedidoDb.toJSON();
  return new Pedido({
    id: data.id,
    usuarioId: data.usuarioId,
    estado: data.estado,
    creadoEn: data.createdAt,
    items: (data.items || []).map((i) => ({ productoId: i.productoId, cantidad: i.cantidad })),
  });
}

class PedidoRepoSequelize {
  async crear({ usuarioId, items }) {
    return db.sequelize.transaction(async (t) => {
      // validar stock
      for (const { productoId, cantidad } of items) {
        const inv = await db.Inventario.findByPk(productoId, {
          transaction: t,
          lock: t.LOCK.UPDATE,
        });
        const stock = inv ? inv.stock_actual : 0;
        if (cantidad > stock) {
          throw new ErrorDeValidacion(`Stock insuficiente para el producto ${productoId}`);
        }
      }

      const pedidoCreado = await db.Pedido.create(
        { usuarioId, estado: ESTADO_PEDIDO.CREADO },
        { transaction: t }
      );

      const itemsDatos = items.map((i) => ({
        pedidoId: pedidoCreado.id,
        productoId: i.productoId,
        cantidad: i.cantidad,
      }));
      await db.PedidoItem.bulkCreate(itemsDatos, { transaction: t });

      // descontar inventario
      for (const { productoId, cantidad } of items) {
        await db.Inventario.decrement('stock_actual', {
          by: cantidad,
          where: { productoId },
          transaction: t,
        });
      }

      const pedido = await db.Pedido.findByPk(pedidoCreado.id, {
        include: [{ model: db.PedidoItem, as: 'items' }],
        transaction: t,
      });
      return aEntidad(pedido);
    });
  }

  async obtenerPorId(id) {
    const pedido = await db.Pedido.findByPk(id, {
      include: [{ model: db.PedidoItem, as: 'items' }],
    });
    return pedido ? aEntidad(pedido) : null;
  }

  async listarPorUsuario(usuarioId) {
    const pedidos = await db.Pedido.findAll({
      where: { usuarioId },
      include: [{ model: db.PedidoItem, as: 'items' }],
    });
    return pedidos.map(aEntidad);
  }

  async cancelar(id) {
    return db.sequelize.transaction(async (t) => {
      const pedido = await db.Pedido.findByPk(id, {
        include: [{ model: db.PedidoItem, as: 'items' }],
        transaction: t,
        lock: t.LOCK.UPDATE,
      });
      if (!pedido || pedido.estado === ESTADO_PEDIDO.CANCELADO) {
        return null;
      }

      await pedido.update({ estado: ESTADO_PEDIDO.CANCELADO }, { transaction: t });

      for (const item of pedido.items) {
        await db.Inventario.increment('stock_actual', {
          by: item.cantidad,
          where: { productoId: item.productoId },
          transaction: t,
        });
      }

      return aEntidad(pedido);
    });
  }
}

module.exports = { PedidoRepoSequelize };
