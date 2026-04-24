# Endpoints de Usuarios y Autenticación

## Autenticación

### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response (200):
{
  "access_token": "jwt_token",
  "usuario": {
    "id": "uuid",
    "username": "string",
    "nombre": "string",
    "rol": "admin|operador|analista"
  }
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer <jwt_token>

Response (200):
{
  "mensaje": "Sesión cerrada correctamente"
}
```

## Gestión de Usuarios

### Obtener todos los usuarios
```
GET /usuarios
Authorization: Bearer <jwt_token>

Response (200):
[
  {
    "id": "uuid",
    "username": "string",
    "nombre": "string",
    "rol": "admin|operador|analista",
    "creado": "timestamp",
    "ultimoAcceso": "timestamp|null"
  }
]
```

### Obtener usuario por ID
```
GET /usuarios/:id
Authorization: Bearer <jwt_token>

Response (200):
{
  "id": "uuid",
  "username": "string",
  "nombre": "string",
  "rol": "admin|operador|analista",
  "activo": boolean,
  "creado": "timestamp",
  "ultimoAcceso": "timestamp|null",
  "actualizado": "timestamp"
}
```

### Crear usuario (solo admin)
```
POST /usuarios
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "username": "string (3-50 chars, único)",
  "nombre": "string (3-255 chars)",
  "password": "string (min 8 chars)",
  "rol": "admin|operador|analista"
}

Response (201):
{
  "id": "uuid",
  "username": "string",
  "nombre": "string",
  "rol": "admin|operador|analista"
}
```

### Actualizar usuario (solo admin)
```
PUT /usuarios/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "nombre": "string (opcional)",
  "rol": "admin|operador|analista (opcional)"
}

Response (200):
{
  "id": "uuid",
  "username": "string",
  "nombre": "string",
  "rol": "admin|operador|analista"
}
```

### Cambiar contraseña propia
```
POST /usuarios/cambiar-contrasena
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "passwordActual": "string",
  "passwordNueva": "string (min 8 chars)"
}

Response (200):
{
  "mensaje": "Contraseña cambiada correctamente"
}

Errors:
- 401: Contraseña actual incorrecta
```

### Restablecer contraseña de otro usuario (solo admin)
```
POST /usuarios/:id/restablecer-contrasena
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "passwordNueva": "string (min 8 chars)",
  "passwordConfirmacion": "string (debe coincidir con passwordNueva)"
}

Response (200):
{
  "mensaje": "Contraseña restablecida correctamente"
}

Errors:
- 400: Las contraseñas no coinciden
```

### Eliminar usuario (soft delete - solo admin)
```
DELETE /usuarios/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "passwordConfirmacion": "string (contraseña del admin que ejecuta)"
}

Response (200):
{
  "mensaje": "Usuario eliminado correctamente"
}

Errors:
- 401: Contraseña de administrador incorrecta
```

## Notas de Seguridad

1. **Logout**: El token se revoca en la base de datos. Los tokens revocados no serán aceptados en futuras peticiones.

2. **Eliminación de usuario**: Es un "soft delete" - el usuario se desactiva pero sus datos se mantienen en la BD. Se registra en auditoría.

3. **Restablecimiento de contraseña**: Requiere confirmación del administrador (su contraseña).

4. **Cambio de contraseña**: El usuario debe confirmar su contraseña actual antes de cambiarla.

5. **Auditoría**: Todas las acciones se registran en la tabla `audit_logs` con:
   - Usuario que ejecutó la acción
   - Tipo de acción
   - ID del usuario afectado
   - Cambios realizados
   - IP del cliente (para login)
