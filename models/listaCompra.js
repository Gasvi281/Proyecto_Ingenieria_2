'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ListaCompra extends Model {
         static associate(models) {
            ListaCompra.hasMany(models.ProductosLista, {foreignKey:"listaId", as:"elementosLista"})
            ListaCompra.belongsTo(models.Cuenta, {foreignKey:"cuentaId", as:"cuenta"})
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
            cuentaId: {
                type: DataTypes.STRING,
                allowNull: false,
                references:{
                    model: "Cuentas",
                    key: "id",
                }
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