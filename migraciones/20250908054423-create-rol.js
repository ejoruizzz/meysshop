'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(20), allowNull: false, unique: true },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    await queryInterface.addIndex('roles', ['nombre'], { unique: true, name: 'roles_nombre_uq' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('roles');
  }
};
