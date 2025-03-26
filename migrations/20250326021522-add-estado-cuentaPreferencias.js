"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("CuentaPreferencias", "estado", {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Activo",
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("CuentaPreferencias", "estado");
    }
};

