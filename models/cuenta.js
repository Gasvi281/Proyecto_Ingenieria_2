'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class cuenta extends Model {
        static associate(models) {
            // Definir asociaciones aquí si es necesario
        }
    }

    cuenta.init(
        {
            nombreUsuario: {
                type: DataTypes.STRING,
                unique:true,
                allowNull: false,
                primaryKey: true, // Define 'id' como clave primaria
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

        },
        {
            sequelize,
            modelName: "Usuario",
            tableName: "usuario", // Especificar nombre de la tabla
            timestamps: true, // Agrega createdAt y updatedAt
        }
    );

    return Usuario;
};