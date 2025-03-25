'use strict';
const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class CuentaImpedimientos extends Model {
        static associate(models) {
            CuentaImpedimientos.belongsTo(models.Cuenta, { foreignKey: "cuentaId", as: "cuenta" });
            CuentaImpedimientos.belongsTo(models.Prodcuto, { foreignKey: "productoId", as: "producto" });
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
                allowNull: false,
                references: {
                    model: "cuenta",
                    key: "id",
                },
                onDelete: "RESTRICT",
            },
            productoId: {
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
            modelName: "CuentaImpedimientos",
            tableName: "cuenta_impedimientos",
            timestamps: true,
        }
    )
}