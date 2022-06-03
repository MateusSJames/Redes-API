const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }, 
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {sequelize, modelName: 'Product', timestamps: false}

);

module.exports = Product;