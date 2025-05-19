'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Recetas', 'estado', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Activo',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Recetas', 'estado');
  },
};
