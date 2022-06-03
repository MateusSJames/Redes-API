const Sequelize = require('sequelize');
const configDB = require('./config/database');

const connection = new Sequelize(configDB.database, configDB.username, configDB.password, {
    host: configDB.host, dialect: configDB.dialect
});

module.exports = connection;