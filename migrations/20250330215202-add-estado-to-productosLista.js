"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("productos_lista", "estado", {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Activo",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("productos_lista", "estado");
    },
};

