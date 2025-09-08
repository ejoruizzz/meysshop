'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventario', {
      productoId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: { model: 'productos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      stock_actual: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      stock_minimo: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.addIndex('inventario', ['stock_actual'], { name: 'inventario_stock_actual_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('inventario');
  }
};
