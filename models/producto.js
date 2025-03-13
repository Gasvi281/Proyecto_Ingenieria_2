'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Producto extends Model {
        static associate(models) {//Definir asociaciones
            Producto.belongsToMany(models.Cuenta, {
                through: "CuentaPreferencias",
                as: "preferencias",
                foreignKey: "productoId",
            });
            Producto.belongsToMany(models.Cuenta, {
                through: "CuentaImpedimentos",
                as: "impedimentos",
                foreignKey: "productoId",
            });
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