const { Sequelize } = require('sequelize');
const { config } = require('./env');

const sequelize = new Sequelize({
  dialect: config.DB_DIALECT,
  host: config.DB_HOST,
  port: Number(config.DB_PUERTO),
  database: config.DB_NOMBRE,
  username: config.DB_USUARIO,
  password: config.DB_PASSWORD,
  logging: config.NODE_ENV === 'development' ? console.log : false
});

module.exports = { sequelize };
