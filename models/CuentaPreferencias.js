'use strict';
const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CuentaPreferencias extends Model {
        static associate(models) {
            CuentaPreferencias.belongsTo(models.Cuenta, { foreignKey: "cuentaId", as: "cuenta" });
            CuentaPreferencias.belongsTo(models.Producto, { foreignKey: "productoId", as: "producto" });
        }
    }

    CuentaPreferencias.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            cuentaId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "cuenta",
                    key: "id",
                },
                onDelete: "RESTRICT",
            },
            productoId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "producto",
                    key: "id",
                },
                onDelete: "RESTRICT",
            }
        },
        {
            sequelize,
            modelName: "CuentaPreferencias",
            tableName: "cuenta_preferencias",
            timestamps: true,
        }
    )
    return CuentaPreferencias;
}