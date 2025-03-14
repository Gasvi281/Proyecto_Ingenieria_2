'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Cuenta extends Model {
        static associate(models) {//Definimos relaciones
            Cuenta.belongsToMany(models.Producto,{
                through: "CuentaPreferencias",
                as: "preferencias",
                foreignKey: "cuentaId",
            });
            Cuenta.belongsToMany(models.Producto,{
                through: "CuentaImpedimentos",
                as: "impedimentos",
                foreignKey: "cuentaId",
            });
        }
    }

    Cuenta.init(
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
            // fotoPerfil: {

            //     //Como se llena esto?
            // },
            estado: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "Activo"

            },


        },
        {
            sequelize,
            modelName: "Cuenta",
            tableName: "Cuentas", // Especificar nombre de la tabla
            timestamps: true, // Agrega createdAt y updatedAt
        }
    );

    return Cuenta;
};