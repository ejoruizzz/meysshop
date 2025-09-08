'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productos', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER.UNSIGNED },
      nombre: { type: Sequelize.STRING(120), allowNull: false },
      descripcion: { type: Sequelize.TEXT, allowNull: true },
      precio: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      activo: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      categoriaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'categorias', key: 'id' },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.addIndex('productos', ['categoriaId'], { name: 'productos_categoriaId_idx' });
    await queryInterface.addIndex('productos', ['nombre'], { name: 'productos_nombre_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('productos');
  }
};
