# Guía Rápida - Gestión de Usuarios y Logout

## ✅ Problemas Resueltos

### 1. Logout Funcional
**Antes**: Al cerrar sesión, el token seguía siendo válido en el servidor  
**Ahora**: El token se revoca en la BD y no puede volver a usarse

### 2. Administración de Usuarios
**Antes**: No había forma de eliminar o restablecer contraseñas  
**Ahora**: El admin puede:
- ✅ Crear nuevos usuarios
- ✅ Editar usuarios existentes
- ✅ Restablecer contraseña (con confirmación)
- ✅ Eliminar usuarios (soft delete con respaldo)
- ✅ Ver auditoría de cambios

---

## 📋 Nuevos Endpoints

### Auth
```
POST /auth/login              → Inicia sesión
POST /auth/logout             → Cierra sesión y revoca token
```

### Usuarios (Requieren autenticación)
```
GET    /usuarios              → Listar todos los usuarios
GET    /usuarios/:id          → Obtener usuario específico
POST   /usuarios              → Crear nuevo usuario
PUT    /usuarios/:id          → Editar usuario
POST   /usuarios/cambiar-contrasena    → Cambiar propia contraseña
POST   /usuarios/:id/restablecer-contrasena → Admin restablece contraseña
DELETE /usuarios/:id          → Admin desactiva usuario
```

---

## 🔐 Flujos de Seguridad

### Cerrar Sesión
```
1. Usuario hace clic en "Cerrar sesión"
2. Frontend hace POST a /auth/logout
3. Backend revoca el token
4. Frontend limpia localStorage
5. Redirige a login
```

### Eliminar Usuario (con confirmación)
```
1. Admin selecciona usuario en lista
2. Hace clic en "Eliminar"
3. Sistema muestra: "¿Estás seguro?"
4. Admin ingresa su propia contraseña
5. Admin confirma
6. Usuario se desactiva (los datos se conservan)
7. Se registra en auditoría
```

### Restablecer Contraseña (con confirmación)
```
1. Admin selecciona usuario
2. Hace clic en "Restablecer contraseña"
3. Admin ingresa contraseña nueva
4. Admin confirma contraseña nueva
5. Admin confirma con su propia contraseña
6. Se registra en auditoría
7. El usuario deberá cambiar su contraseña en el próximo login
```

---

## 🚀 Cómo Usar

### 1. Iniciar el servidor (primera vez)
```bash
cd backend
npm install
npm run start:dev
```

### 2. Login inicial
```bash
# Usuario por defecto
Username: admin
Password: admin123
```

**Cambiar contraseña inmediatamente**

### 3. Crear un usuario operador
```bash
POST http://localhost:3000/usuarios

Headers:
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

Body:
{
  "username": "juan",
  "nombre": "Juan Pérez",
  "password": "micontraseña123",
  "rol": "operador"
}
```

### 4. Cerrar sesión
```bash
POST http://localhost:3000/auth/logout

Headers:
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📊 Base de Datos

### Nuevas tablas
- `tokens_revocados` - Guarda tokens inválidos

### Tablas modificadas
- `usuarios` - Sin cambios en estructura (solo en uso)

### Registros de auditoría
- Se registran: LOGOUT, CREAR_USUARIO, RESTABLECER_CONTRASENA, ELIMINAR_USUARIO, etc.

---

## ⚠️ Consideraciones Importantes

1. **Tokens revocados se limpian automáticamente** después de expirar
2. **Eliminación de usuario es reversible** - Los datos se conservan, solo se desactiva
3. **Contraseña de admin es obligatoria** para acciones sensibles
4. **Las acciones se registran en auditoría** para compliance y debugging
5. **Los tokens duran 24 horas** - Configurable en JWT_SECRET

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| `401 Token inválido` | El token expiró o fue revocado. Haz login de nuevo |
| `401 Contraseña incorrecta` | Verifica que escribiste correctamente la contraseña |
| `400 Contraseñas no coinciden` | Las dos contraseñas deben ser iguales |
| `404 Usuario no encontrado` | El usuario no existe o fue eliminado |
| `CORS error` | Verifica que el backend está corriendo en puerto 3000 |

---

## 📝 Próximos Pasos (Frontend)

El backend está listo. El frontend necesita:

1. ✅ Login/Logout UI
2. ✅ Panel de administración de usuarios
3. ✅ Modales de confirmación
4. ✅ Manejo de errores HTTP
5. ✅ Guardado de token en localStorage

Ver `CAMBIOS_IMPLEMENTADOS.md` para más detalles técnicos.

---

## 🔗 Documentación Completa

- `backend/src/usuarios/ENDPOINTS.md` - Referencia técnica de endpoints
- `CAMBIOS_IMPLEMENTADOS.md` - Cambios detallados en el código
- `SETUP_INICIAL.md` - Instrucciones de instalación y setup
