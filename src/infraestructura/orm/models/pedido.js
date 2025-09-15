'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      Pedido.hasMany(models.PedidoItem, { as: 'items', foreignKey: 'pedidoId' });
      Pedido.belongsTo(models.Usuario, { as: 'usuario', foreignKey: 'usuarioId' });
    }
  }

  Pedido.init(
    {
      usuarioId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      estado: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
      sequelize,
      modelName: 'Pedido',
      tableName: 'pedidos',
      timestamps: true,
    }
  );

  return Pedido;
};
