'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    static associate(models) {
      // categoria 1..* productos
      Categoria.hasMany(models.Producto, { as: 'productos', foreignKey: 'categoriaId' });
    }
  }

  Categoria.init(
    {
      nombre: { type: DataTypes.STRING(100), allowNull: false }
    },
    {
      sequelize,
      modelName: 'Categoria',
      tableName: 'categorias',
      timestamps: true
    }
  );

  return Categoria;
};
