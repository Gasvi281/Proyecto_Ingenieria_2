"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Crear la tabla Productos primero
        await queryInterface.createTable("Productos", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            nombreProducto: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            categoria: {
                type: Sequelize.STRING,
                allowNull: false,
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
            }
        });

        // Crear la tabla Cuentas después
        await queryInterface.createTable("Cuentas", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            nombreUsuario: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
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
            }
        });

        // Crear la tabla intermedia para preferencias
        await queryInterface.createTable("CuentaPreferencias", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            cuentaId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Cuentas",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            productoId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Productos",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
            }
        });

        // Crear la tabla intermedia para impedimentos
        await queryInterface.createTable("CuentaImpedimentos", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            cuentaId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Cuentas",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            productoId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Productos",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
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
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("CuentaImpedimentos");
        await queryInterface.dropTable("CuentaPreferencias");
        await queryInterface.dropTable("Cuentas");
        await queryInterface.dropTable("Productos");
    }
};
