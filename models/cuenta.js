'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Cuenta extends Model {
        static associate(models) {
            // Definir asociaciones aquí si es necesario
        }
    }

    cuenta.init(
        {
        
            id:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, // Genera un UUID automáticamente
                allowNull: false,
                primaryKey: true, // Define 'id' como clave primaria
            },
            nombreUsuario: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fotoPerfil: {

                //Como se llena esto?
            },
            preferencias: {
                type: DataTypes.STRING, //Foreign key?
                allowNull: false
            },
            impedimentos: {
                //Foreign key

            },
            estado: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Activo"

            },


        },
        {
            sequelize,
            modelName: "Cuenta",
            tableName: "Cuenta", // Especificar nombre de la tabla
            timestamps: true, // Agrega createdAt y updatedAt
        }
    );

    return Cuenta;
};