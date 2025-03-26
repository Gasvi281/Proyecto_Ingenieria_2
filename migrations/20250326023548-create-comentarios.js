"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("comentarios", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            comentario: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nombreUsuario: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: "Cuentas",
                    key: "nombreUsuario",
                },
                onUpdate: "CASCADE",
                onDelete: "SET NULL",
            },
            fecha: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            estado: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "Activo",
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("comentarios");
    },
};

