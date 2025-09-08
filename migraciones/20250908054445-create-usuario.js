'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(120), allowNull: false, unique: true },
      hash: { type: Sequelize.STRING(255), allowNull: false },
      rolId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') }
    });

    // Índices útiles
    await queryInterface.addIndex('usuarios', ['email'], { unique: true, name: 'usuarios_email_uq' });
    await queryInterface.addIndex('usuarios', ['rolId'], { name: 'usuarios_rolId_idx' });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('usuarios');
  }
};
