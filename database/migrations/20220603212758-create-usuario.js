'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
       },
       name: {
         type: Sequelize.STRING,
         allowNull: false
       },
       cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: false
      },
      biografia: {
        type: Sequelize.STRING,
        allowNull: false
      },
       email: {
         type: Sequelize.STRING,
         allowNull: false
       },
       senha: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }); 
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('users');
  }
};
