const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/connection');



class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          cpf: {
           type: DataTypes.STRING,
           allowNull: false
         },
         avatar: {
           type: DataTypes.STRING,
           allowNull: false
         },
         biografia: {
           type: DataTypes.STRING,
           allowNull: false
         },
          email: {
            type: DataTypes.STRING,
            allowNull: false
          },
          senha: {
           type: DataTypes.STRING,
           allowNull: false
         }
    }, {sequelize, modelName: 'User',timestamps: false}
);

module.exports = User;