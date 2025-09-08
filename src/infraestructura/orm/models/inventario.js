'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    static associate(models) {
      // inventario *..1 producto
      Inventario.belongsTo(models.Producto, { as: 'producto', foreignKey: 'productoId' });
    }
  }

  Inventario.init(
    {
      productoId:  { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
      stock_actual:{ type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      stock_minimo:{ type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
    },
    {
      sequelize,
      modelName: 'Inventario',
      tableName: 'inventario',
      timestamps: true
    }
  );

  return Inventario;
};
