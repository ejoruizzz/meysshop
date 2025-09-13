'use strict';

const db = require('./models');

async function inicializarDB() {
  await db.sequelize.authenticate();
  console.log('Conexión con BD establecida (migraciones gobiernan el esquema).');
}

module.exports = { db, inicializarDB };
