class Producto {
  constructor({ id = null, nombre, descripcion = null, precio, activo = true, categoriaId = null, categoria = null, inventario = null }) {
    if (!nombre) {
      throw new Error('Nombre requerido');
    }
    if (typeof precio !== 'number' || precio <= 0) {
      throw new Error('Precio debe ser positivo');
    }
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.activo = activo;
    this.categoriaId = categoriaId;
    this.categoria = categoria;
    this.inventario = inventario;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      activo: this.activo,
      categoriaId: this.categoriaId,
      categoria: this.categoria,
      inventario: this.inventario,
    };
  }
}

module.exports = Producto;
