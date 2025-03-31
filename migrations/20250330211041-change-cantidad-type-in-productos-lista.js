"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn("productos_lista", "cantidad", {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn("productos_lista", "cantidad", {
            type: Sequelize.INTEGER,
            allowNull: false,
        });
    },
};

