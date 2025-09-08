require('dotenv').config();

const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PUERTO: process.env.PUERTO || '3000',
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PUERTO: process.env.DB_PUERTO || '3306',
  DB_NOMBRE: process.env.DB_NOMBRE || 'meysshop',
  DB_USUARIO: process.env.DB_USUARIO || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  SYNC_DB: process.env.SYNC_DB || 'none'
};

module.exports = { config };
