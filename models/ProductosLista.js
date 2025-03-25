'use strict';
const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class ProductosLista extends Model {
        static associate(models) {
            ProductosLista.belongsTo(models.ListaCompra, { foreignKey: "listaId", as: "lista" });
        }
    }

    ProductosLista.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            listaId: {
                allowNull: false,
                references: {
                    model: "listaCompra",
                    key: "id",
                },
                onDelete: "RESTRICT",
            },
        },
        {
            sequelize,
            modelName: "ProductosLista",
            tableName: "productos_lista",
            timestamps: true,
        }
    )
}