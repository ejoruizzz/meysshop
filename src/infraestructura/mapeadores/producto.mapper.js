const Producto = require('../../dominio/entidades/Producto');

function aEntidad(row) {
  if (!row) return null;
  const {
    id,
    nombre,
    descripcion = null,
    precio,
    activo = true,
    categoriaId = null,
    categoria = null,
    inventario = null,
  } = row;
  return new Producto({
    id,
    nombre,
    descripcion,
    precio: typeof precio === 'string' ? parseFloat(precio) : precio,
    activo,
    categoriaId,
    categoria,
    inventario,
  });
}

function aPersistencia(obj) {
  if (obj instanceof Producto) {
    obj = obj.toJSON();
  }
  const {
    id = null,
    nombre,
    descripcion = null,
    precio,
    activo = true,
    categoriaId = null,
  } = obj;
  return { id, nombre, descripcion, precio, activo, categoriaId };
}

module.exports = { aEntidad, aPersistencia };
