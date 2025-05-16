const { Sequelize } = require('sequelize');
const path = require('path');

// Adjust this to the correct path where config.json is located
const config = require(path.resolve(__dirname, '../databases/postgres/config.json'));

const sequelize = new Sequelize(config.development); // Adjust to your environment

module.exports = sequelize;
