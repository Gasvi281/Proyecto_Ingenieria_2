'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Producto extends Model {
        static associate(models) {//Definir asociaciones
            Producto.hasMany(models.CuentaPreferencias,{foreignKey: "productoId", as: "preferencias"}
            );
            Producto.hasMany(models.CuentaImpedimientos,{ foreignKey: "productoId", as: "impedimentos"}
            );
            Producto.hasMany(models.ProductosLista, { foreignKey: "productoId", as: "elementosLista"}
            );
            Producto.hasMany(models.Receta,{foreignKey:"productoId", as: "recetas"})
        }
    }

    Producto.init(
        {
            id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, // Genera un UUID automáticamente
                allowNull: false,
                primaryKey: true, // Define 'id' como clave primaria
            },
            nombreProducto: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            categoria: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            estado: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Activo"

            },
        },
        {
            sequelize,
            modelName: "Producto",
            tableName: "Producto", // Especificar nombre de la tabla
            timestamps: true, // Agrega createdAt y updatedAt
        }
    );

    return Producto;
};