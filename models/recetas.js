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
                unique: true,
            },
            dificultad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Categoria: {
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
            modelName: "Receta",
            tableName: "Recetas",
            timestamps: true,
        }
    );

    return Recetas;
};