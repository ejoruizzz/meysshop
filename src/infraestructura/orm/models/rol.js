'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {
      // roles 1..* usuarios
      Rol.hasMany(models.Usuario, { as: 'usuarios', foreignKey: 'rolId' });
    }
  }

  Rol.init(
    {
      nombre: { type: DataTypes.STRING(20), allowNull: false, unique: true }
    },
    {
      sequelize,
      modelName: 'Rol',
      tableName: 'roles',
      timestamps: true
    }
  );

  return Rol;
};
