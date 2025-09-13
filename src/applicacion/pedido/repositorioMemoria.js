const inventario = {};
const pedidos = [];
let ultimoId = 0;

function generarId() {
  ultimoId += 1;
  return ultimoId;
}

module.exports = {
  inventario,
  pedidos,
  generarId,
};
