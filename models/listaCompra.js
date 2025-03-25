'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class ListaCompra extends Model {
        // static associate(models) {
        //     this.belongsToMany(models.Producto, {
        //         through: 'ListaCompraProducto',
        //         as: 'productos',
        //         foreignKey: 'listaCompraId',
        //         otherKey: 'productoId',
        //     }); 
        // }
    }

    ListaCompra.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            ListaProductos: {
                // type: DataTypes.VIRTUAL,
                // get() {
                //     return this.getProductos();
                // }
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