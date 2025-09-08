'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      // producto *..1 categoria
      Producto.belongsTo(models.Categoria, {
        as: 'categoria',
        foreignKey: 'categoriaId'
      });

      // producto 1..1 inventario
      Producto.hasOne(models.Inventario, {
        as: 'inventario',
        foreignKey: 'productoId',
        onDelete: 'CASCADE'
      });
    }
  }

  Producto.init(
    {
      nombre:      { type: DataTypes.STRING(120), allowNull: false },
      descripcion: { type: DataTypes.TEXT, allowNull: true },
      // precisión correcta para precios:
      precio:      { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      activo:      { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      categoriaId: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
      sequelize,
      modelName: 'Producto',
      tableName: 'productos',
      timestamps: true
    }
  );

  return Producto;
};
