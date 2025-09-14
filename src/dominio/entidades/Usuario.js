const { ErrorDeValidacion } = require('../../applicacion/comun/Excepciones');

class Usuario {
  constructor({ id = null, nombre, email, hash, rolId = null, rol = null }) {
    if (!nombre) {
      throw new ErrorDeValidacion('Nombre requerido');
    }
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new ErrorDeValidacion('Email inválido');
    }
    if (!hash) {
      throw new ErrorDeValidacion('Hash requerido');
    }
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.hash = hash;
    this.rolId = rolId;
    this.rol = rol;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      rolId: this.rolId,
      rol: this.rol,
    };
  }
}

module.exports = Usuario;
