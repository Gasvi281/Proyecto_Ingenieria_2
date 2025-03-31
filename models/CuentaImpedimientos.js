'use strict';
const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CuentaImpedimientos extends Model {
        static associate(models) {
            CuentaImpedimientos.belongsTo(models.Cuenta, { foreignKey: "cuentaId", as: "cuenta" });
            CuentaImpedimientos.belongsTo(models.Producto, { foreignKey: "productoId", as: "producto" });
        }
    }

    CuentaImpedimientos.init(
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
            },
            estado: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Activo"
            }
        },
        {
            sequelize,
            modelName: "CuentaImpedimientos",
            tableName: "CuentaImpedimentos",
            timestamps: true,
        }
    )
    return CuentaImpedimientos;
}