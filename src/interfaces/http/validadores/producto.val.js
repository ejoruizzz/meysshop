const { z } = require('zod');

const productoSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  precio: z.number({ invalid_type_error: 'Precio debe ser número' }).positive('Precio debe ser positivo'),
  descripcion: z.string().optional(),
  categoriaId: z.number().int().positive().optional(),
});

module.exports = { productoSchema };
