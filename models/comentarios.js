'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Comentario extends Model {
        static associate(models) {
            Comentario.belongsTo(models.Cuenta, {foreignKey:"cuentaId", as:"cuenta"})
        }
    }

    Comentario.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            comentario: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nombreUsuario: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'Cuentas',
                    key: 'nombreUsuario',
                },
            },
            fecha: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
        },
        {
            sequelize,
            modelName: "Comentario",
            tableName: "comentarios",
            timestamps: true,
        }
    );

    return Comentario;
};