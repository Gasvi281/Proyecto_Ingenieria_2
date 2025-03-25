'use strict';
const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class IngredientesReceta extends Model {
        static associate(models) {
            IngredientesReceta.belongsTo(models.Recetas, { foreignKey: "recetaId", as: "receta" });
            IngredientesReceta.belongsTo(models.Producto, {foreignKey:"productoId", as:"producto"})
        }
    }

    IngredientesReceta.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            recetaId: {
                allowNull: false,
                references: {
                    model: "recetas",
                    key: "id",
                },
                onDelete: "RESTRICT",
            },
            productoId: {
                allowNull: false,
                references:{
                    model:"producto",
                    key:"id",
                },
                onDelete: "RESTRICT",
            }
        },
        {
            sequelize,
            modelName: "IngredientesReceta",
            tableName: "productos_lista",
            timestamps: true,
        }
    )
}