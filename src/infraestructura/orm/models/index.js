'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');


const env = process.env.NODE_ENV || 'development';
const cfg = require(path.join(__dirname, '../../../../sequelize-config/config.js'))[env];

const db = {};
const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg);


const db = require('./models');

async function inicializarDB() {
  await db.sequelize.authenticate();
  console.log('Conexión con BD establecida (migraciones gobiernan el esquema).');
  // No uses sync si trabajas con migraciones
}

module.exports = { inicializarDB, db };
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== 'index.js' &&
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((name) => {
  if (db[name].associate) {
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
