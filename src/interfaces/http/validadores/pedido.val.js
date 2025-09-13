const { z } = require('zod');

const itemSchema = z.object({
  productoId: z.number().int().positive(),
  cantidad: z.number().int().positive(),
});

const pedidoSchema = z.object({
  usuarioId: z.number().int().positive(),
  items: z.array(itemSchema).min(1, 'Debe incluir productos'),
});

module.exports = { pedidoSchema };
