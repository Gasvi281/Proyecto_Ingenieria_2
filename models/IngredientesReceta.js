'use strict';
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class IngredientesReceta extends Model {
        static associate(models, DataTypes) {
            IngredientesReceta.belongsTo(models.Receta, { foreignKey: "recetaId", as: "receta" });
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
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "recetas",
                    key: "id",
                },
                onDelete: "RESTRICT",
            },
            productoId: {
                type: DataTypes.UUID,
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
            tableName: "ingredientes_receta",
            timestamps: true,
        }
    )
    return IngredientesReceta;
}