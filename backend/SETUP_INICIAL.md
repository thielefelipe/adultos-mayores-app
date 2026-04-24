# Setup Inicial del Proyecto

## Instalación

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

## Base de Datos

El proyecto usa PostgreSQL. Configura las variables en `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin
DB_NAME=centros_diurnos_db
JWT_SECRET=tu-secret-key-aqui
NODE_ENV=development
```

## Inicialización

### En desarrollo
Si `NODE_ENV=development`, TypeORM sincronizará automáticamente las tablas.

### Usuario Admin Inicial

Credenciales por defecto:
- **username**: admin
- **password**: admin123

⚠️ **IMPORTANTE**: Cambiar esta contraseña inmediatamente.

## Ejecución

### Backend
```bash
cd backend
npm run start:dev  # Desarrollo con hot reload
npm run start      # Producción
```

El servidor estará disponible en `http://localhost:3000`

### Frontend
```bash
cd frontend
npm run dev
```

## Testing

### Probar Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Respuesta:
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

### Probar Logout
```bash
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Probar Endpoints de Usuario
```bash
# Listar usuarios
curl http://localhost:3000/usuarios \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Crear usuario
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "username": "operador1",
    "nombre": "Juan Pérez",
    "password": "password123",
    "rol": "operador"
  }'
```

## Estructura de Carpetas

```
.
├── backend/
│   ├── src/
│   │   ├── entities/          (modelos de BD)
│   │   ├── auth/              (autenticación)
│   │   ├── usuarios/          (gestión de usuarios)
│   │   ├── pacientes/         (gestión de pacientes)
│   │   ├── audit/             (auditoría)
│   │   └── main.ts
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
└── CAMBIOS_IMPLEMENTADOS.md   (resumen de cambios)
```

## Próximas Tareas

1. ✅ Backend: Implementar logout y gestión de usuarios
2. ⏳ Frontend: Crear interfaz de login/logout
3. ⏳ Frontend: Crear panel de administración de usuarios
4. ⏳ Frontend: Agregar modales de confirmación
5. ⏳ Frontend: Implementar manejo de errores

## Solución de Problemas

### El server no inicia
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en .env
- Revisa los logs de error

### Token inválido
- Verifica que el JWT_SECRET sea el mismo en todas las instancias
- Los tokens expiran en 24h por defecto

### CORS en desarrollo
- El backend está configurado para aceptar peticiones locales
- Si necesitas cambiar el origen, modifica `main.ts`
