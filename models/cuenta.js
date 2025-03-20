'use strict';
const { Model, DataTypes } = require('sequelize');
const { bcrypt } = require('bcryptjs');

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

        async validarPassword(password){
            return await bcrypt.compare(password, this.password);
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
            password:{
                type: DataTypes.STRING,
                allowNull: false,
            },


        },
        {
            sequelize,
            modelName: "Cuenta",
            tableName: "Cuentas", // Especificar nombre de la tabla
            timestamps: true, // Agrega createdAt y updatedAt

            hooks: {
                beforeCreate: async (cuenta)=>{
                    const salt = await bcrypt.genSalt(10);
                    cuenta.password = await bcrypt.hash(cuenta.password, salt);
                }
            }
        }
    );

    return Cuenta;
};