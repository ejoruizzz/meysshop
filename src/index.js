const { crearServidor } = require('./interfaces/http/server');
const { inicializarDB } = require('./infraestructura/orm');
const { config } = require('./config/env');

(async () => {
  try {
    await inicializarDB();
    const app = crearServidor();
    const puerto = Number(config.PUERTO || 3000);
    app.listen(puerto, () => console.log(`API lista en http://localhost:${puerto}`));
  } catch (e) {
    console.error('Fallo al iniciar:', e);
    process.exit(1);
  }
})();
