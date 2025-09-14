class ErrorDeAplicacion extends Error {
  constructor(mensaje, codigo = 500) {
    super(mensaje);
    this.name = this.constructor.name;
    this.codigo = codigo;
  }
}

class RecursoNoEncontrado extends ErrorDeAplicacion {
  constructor(mensaje = 'Recurso no encontrado') {
    super(mensaje, 404);
  }
}

class ErrorDeValidacion extends ErrorDeAplicacion {
  constructor(mensaje = 'Datos inválidos') {
    super(mensaje, 400);
  }
}

module.exports = {
  ErrorDeAplicacion,
  RecursoNoEncontrado,
  ErrorDeValidacion,
};
