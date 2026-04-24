# 🚀 Inicio Rápido - Centro de Gestión

## Requisitos
- Node.js 18+ instalado
- PostgreSQL corriendo
- Dos terminales abiertas

## ⚡ 1 Minuto para Empezar

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run start:dev
```

Verás: `Servidor ejecutándose en http://localhost:3000`

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Verás: `Local: http://localhost:5173`

### Abre el navegador
```
http://localhost:5173
```

## 🔑 Credenciales de Prueba
```
Usuario: admin
Contraseña: admin123
```

---

## 📊 Lo que Puedes Hacer

### ✅ Autenticación
- [x] Login con usuario/contraseña
- [x] Logout revoca el token en servidor
- [x] Token persiste al recargar página
- [x] Token se invalida al cerrar sesión

### ✅ Administración de Usuarios
- [x] Ver lista de usuarios
- [x] Crear nuevo usuario
- [x] Restablecer contraseña de usuario (con confirmación)
- [x] Eliminar usuario (soft delete con confirmación)
- [x] Todos los cambios se registran en auditoría

### ✅ Seguridad
- [x] Contraseñas hasheadas con bcrypt
- [x] Tokens JWT con expiración 24h
- [x] Confirmación de contraseña para operaciones sensibles
- [x] Tokens revocados no pueden reutilizarse

---

## 🎬 Flujo Completo de Prueba

### 1. Login
1. Abre http://localhost:5173
2. Usuario: `admin`
3. Contraseña: `admin123`
4. ✅ Te redirige al dashboard

### 2. Ver Usuarios
- Verás una tabla con un usuario (admin)
- Badge morado indicando "admin"

### 3. Crear Usuario
1. Click en botón "➕ Crear Usuario"
2. Completa el formulario:
   - Usuario: `juan`
   - Nombre: `Juan Pérez`
   - Contraseña: `password123`
   - Rol: `operador`
3. Click "➕ Crear"
4. ✅ Usuario creado, aparece en la tabla

### 4. Restablecer Contraseña
1. Click en botón "🔑" (clave) del usuario juan
2. Ingresa nueva contraseña: `nuevapass123`
3. Click "🔑 Restablecer"
4. ✅ Contraseña restablecida (juan debe usar la nueva)

### 5. Eliminar Usuario
1. Click en botón "🗑️" (basura) del usuario juan
2. Aparece modal pidiendo confirmación
3. Ingresa tu contraseña de admin: `admin123`
4. Click "🗑️ Eliminar"
5. ✅ Usuario desactivado (datos conservados en BD)

### 6. Logout
1. Click en botón "🚪 Cerrar sesión" (esquina superior)
2. Confirma en el diálogo
3. ✅ Token revocado en servidor
4. ✅ Te redirige a login

---

## 🔍 Verifica que Todo Funciona

### Backend
```bash
# En terminal del backend
curl http://localhost:3000
# Debería responder: "Hello World!"
```

### Autenticación
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Respuesta esperada:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "id": "uuid",
    "username": "admin",
    "nombre": "Administrador",
    "rol": "admin"
  }
}
```

### Usuarios (reemplaza TOKEN)
```bash
curl http://localhost:3000/usuarios \
  -H "Authorization: Bearer TOKEN_AQUI"
```

---

## ⚠️ Problemas Comunes

| Problema | Solución |
|----------|----------|
| `ECONNREFUSED` en frontend | Backend no está corriendo en :3000 |
| `404 database` | PostgreSQL no está corriendo |
| `CORS error` | Backend debe estar en http://localhost:3000 |
| `undefined username` | Token expiró, haz login de nuevo |
| `Botones deshabilitados` | Backend está procesando, espera |

---

## 📚 Documentación Completa

| Archivo | Contenido |
|---------|----------|
| `GUIA_RAPIDA.md` | Guía de usuario |
| `CAMBIOS_IMPLEMENTADOS.md` | Qué se implementó |
| `SETUP_INICIAL.md` | Instalación detallada |
| `backend/src/usuarios/ENDPOINTS.md` | Referencia de API |
| `frontend/FRONTEND_README.md` | Detalles del frontend |

---

## ✅ Checklist de Verificación

- [ ] Backend corriendo en :3000
- [ ] Frontend corriendo en :5173
- [ ] Base de datos PostgreSQL conectada
- [ ] Login funciona con admin/admin123
- [ ] Puedo ver usuarios
- [ ] Puedo crear usuario
- [ ] Puedo restablecer contraseña
- [ ] Puedo eliminar usuario
- [ ] Logout funciona y revoca token
- [ ] Token no se puede reutilizar después de logout

Si todos los puntos están ✅, ¡el sistema está listo para usar!

---

## 🎯 Próximos Pasos

1. **Personaliza credenciales**: Crea un nuevo admin con contraseña segura
2. **Conecta datos reales**: Integra con BD de pacientes
3. **Añade módulos**: Crea páginas para pacientes, tratamientos, etc.
4. **Mejora UI**: Personaliza estilos según tu marca
5. **Deploy**: Sube a servidor producción

---

## 💡 Tips

- **Token expira en 24h**: Los usuarios deben volver a loguearse
- **Soft delete**: Los usuarios eliminados se pueden reactivar manualmente en BD
- **Auditoría**: Todo cambio está registrado en `audit_logs`
- **CORS**: Configurable en `backend/src/main.ts`
- **Variables .env**: Usar para configuración sensible

---

**¿Problemas?** Revisa los logs en ambas terminales. Los errores aparecen ahí.

**¿Listo?** ¡Comienza a usar el sistema! 🎉
