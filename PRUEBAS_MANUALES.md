# Pruebas manuales de protección de rutas

Las rutas protegidas requieren un encabezado `Authorization` con un token JWT válido:

```
Authorization: Bearer <token>
```

## Pedidos
- `POST /api/pedidos` requiere JWT.
- `GET /api/pedidos/:usuarioId` requiere JWT.
- `DELETE /api/pedidos/:id` requiere JWT.

## Productos (solo administradores)
Las siguientes rutas requieren un token de un usuario con `rol` **admin**:
- `POST /api/productos`
- `PUT /api/productos/:id`
- `DELETE /api/productos/:id`

Las rutas `GET /api/productos` y `GET /api/productos/:id` no requieren autenticación.

