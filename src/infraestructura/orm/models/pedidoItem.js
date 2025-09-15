'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PedidoItem extends Model {
    static associate(models) {
      PedidoItem.belongsTo(models.Pedido, { as: 'pedido', foreignKey: 'pedidoId' });
      PedidoItem.belongsTo(models.Producto, { as: 'producto', foreignKey: 'productoId' });
    }
  }

  PedidoItem.init(
    {
      pedidoId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      productoId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      cantidad: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: 'PedidoItem',
      tableName: 'pedido_items',
      timestamps: false,
    }
  );

  return PedidoItem;
};
