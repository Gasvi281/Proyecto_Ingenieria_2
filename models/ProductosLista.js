'use strict';
const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductosLista extends Model {
        static associate(models) {
            ProductosLista.belongsTo(models.ListaCompra, { foreignKey: "listaId", as: "lista" });
            ProductosLista.belongsTo(models.Producto, { foreignKey: "productoId", as: "Producto"});
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
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "listaCompra",
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
            cantidad: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            estado: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Activo"

            },
        },
        {
            sequelize,
            modelName: "ProductosLista",
            tableName: "productos_lista",
            timestamps: true,
        }
    )
    return ProductosLista;
}