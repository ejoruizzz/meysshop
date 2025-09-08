// sequelize-config/config.js
require('dotenv').config();

const common = {
  username: process.env.DB_USUARIO || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NOMBRE || 'meysshop',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PUERTO || 3306),
  dialect: process.env.DB_DIALECT || 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};

module.exports = {
  development: common,
  test: { ...common, database: process.env.DB_NOMBRE_TEST || 'meysshop_test' },
  production: common
};
