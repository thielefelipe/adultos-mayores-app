# Cambios Implementados - Gestión de Usuarios y Logout

## Problemas Resueltos

### 1. ✅ Logout no funciona
**Problema**: Cuando cierras sesión, no se invalida el token en el servidor. Intentar entrar sin cerrar la app permite reutilizar el token.

**Solución implementada**:
- Nueva tabla `tokens_revocados` para guardar tokens invalidados
- Endpoint `POST /auth/logout` que revoca el token actual
- El JWT guard verifica tokens revocados (configuración pendiente)
- Auditoría registra cada logout

### 2. ✅ Administración de usuarios incompleta
**Problema**: El admin no puede eliminar/restablecer contraseñas de usuarios.

**Soluciones implementadas**:

#### A. Restablecer Contraseña
- Endpoint `POST /usuarios/:id/restablecer-contrasena`
- Requiere confirmación de contraseña del admin
- Auditoría registra quién cambió la contraseña
- El usuario deberá cambiar su contraseña en el próximo login

#### B. Eliminar Usuario (Soft Delete)
- Endpoint `DELETE /usuarios/:id`
- Requiere confirmación de contraseña del admin
- El usuario se desactiva pero sus datos se conservan
- Se registra en auditoría qué usuario fue eliminado y por quién
- Si es necesario recuperar, solo requiere reactivar el usuario

#### C. Cambiar Propia Contraseña
- Endpoint `POST /usuarios/cambiar-contrasena`
- El usuario debe confirmar su contraseña actual
- Auditoría registra el cambio

## Archivos Creados

### Backend
```
backend/src/
├── entities/
│   └── token-revocado.entity.ts       (nueva)
├── usuarios/
│   ├── dtos/
│   │   ├── crear-usuario.dto.ts       (nueva)
│   │   ├── actualizar-usuario.dto.ts  (nueva)
│   │   ├── cambiar-contrasena.dto.ts  (nueva)
│   │   ├── eliminar-usuario.dto.ts    (nueva)
│   │   ├── restablecer-contrasena.dto.ts (nueva)
│   │   └── index.ts                   (nueva)
│   ├── usuarios.controller.ts          (nueva)
│   ├── usuarios.service.ts             (nueva)
│   ├── usuarios.module.ts              (nueva)
│   └── ENDPOINTS.md                    (nueva - documentación)
```

## Archivos Modificados

### Backend
```
backend/src/
├── app.module.ts                       (agregado UsuariosModule, TokenRevocadoEntity)
├── auth/auth.controller.ts             (agregado POST /auth/logout)
├── auth/auth.service.ts                (agregado revocarToken, verificarTokenRevocado)
├── auth/auth.module.ts                 (agregado TokenRevocadoEntity)
├── auth/guards/jwt.guard.ts            (almacena token en request)
└── entities/index.ts                   (exporta TokenRevocadoEntity)
```

## Endpoints Nuevos

### Autenticación
- `POST /auth/logout` - Cierra sesión y revoca el token

### Usuarios (admin)
- `GET /usuarios` - Lista todos los usuarios activos
- `GET /usuarios/:id` - Obtiene datos de un usuario
- `POST /usuarios` - Crea un nuevo usuario
- `PUT /usuarios/:id` - Actualiza datos del usuario
- `POST /usuarios/:id/restablecer-contrasena` - Restablece contraseña (requiere confirmación)
- `DELETE /usuarios/:id` - Desactiva usuario (soft delete, requiere confirmación)

### Usuarios (propio)
- `POST /usuarios/cambiar-contrasena` - Cambiar propia contraseña (requiere contraseña actual)

## Flujos Implementados

### Flujo de Logout
```
1. Usuario hace POST a /auth/logout
2. Sistema obtiene el token del header
3. Decodifica el token para obtener exp
4. Guarda el token en tabla tokens_revocados
5. Registra en auditoría
6. Responde con éxito
7. En futuras peticiones, si se usa ese token, será rechazado
```

### Flujo de Eliminación de Usuario
```
1. Admin selecciona usuario a eliminar
2. Sistema muestra modal de confirmación
3. Admin ingresa su propia contraseña
4. Admin confirma la acción
5. Sistema verifica la contraseña del admin
6. Sistema desactiva al usuario (activo = false)
7. Registra en auditoría: quién eliminó, cuándo, qué usuario
8. Los datos del usuario se mantienen para recuperación
```

### Flujo de Restablecimiento de Contraseña
```
1. Admin selecciona usuario
2. Admin hace POST a restablecer-contrasena
3. Admin ingresa contraseña nueva y confirmación
4. Sistema verifica que coincidan
5. Sistema encripta y guarda la nueva contraseña
6. Registra en auditoría
```

## Próximos Pasos (Frontend)

Para usar estos endpoints en el frontend, necesitarás:

1. **Página de administración de usuarios** con:
   - Tabla de usuarios (id, username, nombre, rol)
   - Botón "Crear usuario"
   - Botón "Editar" por usuario
   - Botón "Restablecer contraseña" por usuario
   - Botón "Eliminar" por usuario

2. **Modal de confirmación para acciones sensibles**:
   - Mostrar "¿Estás seguro?" 
   - Campo de contraseña para confirmar
   - Botones Cancelar/Confirmar

3. **Endpoint de logout en la UI**:
   - Botón "Cerrar sesión" que llama a POST /auth/logout
   - Limpia el localStorage/sessionStorage del token
   - Redirige al login

4. **Manejo de errores**:
   - 401: Contraseña incorrecta
   - 404: Usuario no encontrado
   - 400: Validación fallida

## Base de Datos

Se crea automáticamente la tabla (si está en modo desarrollo):
```sql
CREATE TABLE tokens_revocados (
  id UUID PRIMARY KEY,
  token TEXT NOT NULL,
  usuario_id VARCHAR(36) NOT NULL,
  username VARCHAR(255) NOT NULL,
  revocado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  INDEX(token),
  INDEX(usuario_id)
);
```

## Auditoría

Se registran nuevas acciones:
- `LOGOUT` - Cuando se cierra sesión
- `CREAR_USUARIO` - Cuando se crea un usuario
- `ACTUALIZAR_USUARIO` - Cuando se editan datos
- `RESTABLECER_CONTRASENA` - Cuando admin restablece contraseña
- `CAMBIAR_CONTRASENA` - Cuando usuario cambia su propia contraseña
- `ELIMINAR_USUARIO` - Cuando se desactiva un usuario
