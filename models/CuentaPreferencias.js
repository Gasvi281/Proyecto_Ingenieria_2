'use strict';
const sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

module.exports=(sequelize)=>{
    class CuentaPreferencias extends Model{
        static associate(models){
            CuentaPreferencias.belongsTo(models.Cuenta, {foreignKey: "cuentaId", as: "cuenta"});
            CuentaPreferencias.belongsTo(models.Prodcuto, {foreignKey: "productoId", as: "producto"});
        }
    }

    CuentaPreferencias.init(
        {
            id: {
                
            }
        }
    )
}