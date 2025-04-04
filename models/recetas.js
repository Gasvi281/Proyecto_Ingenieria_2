'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Recetas extends Model {
        
        static associate(models) {
            Recetas.hasMany(models.IngredientesReceta, { foreignKey: "recetaId", as: "ingredientes" })
        }
    }

    Recetas.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dificultad: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            Categoria: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "Receta",
            tableName: "Recetas",
            timestamps: true,
        }
    );

    return Recetas;
};