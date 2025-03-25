'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ListaCompra extends Model {
         static associate(models) {
            ListaCompra.hasMany(models.ProductosLista, {foreignKey:"listaId", as:"elementosLista"})
            ListaCompra.belongsTo(models.Cuenta, {foreignKey:"cuentaId", as:"lista"})
         }
    }

    ListaCompra.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            cuenta: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            
        },
        {
            sequelize,
            modelName: "ListaCompra",
            tableName: "lista_compras",
            timestamps: true,
        }
    );

    return ListaCompra;
};