'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // usuario *..1 rol
      Usuario.belongsTo(models.Rol, { as: 'rol', foreignKey: 'rolId' });
    }
  }

  Usuario.init(
    {
      nombre: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
      hash:  { type: DataTypes.STRING(255), allowNull: false },
      rolId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      timestamps: true
    }
  );

  return Usuario;
};
