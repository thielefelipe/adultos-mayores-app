# Contexto de Sesión - Adultos Mayores App

## Estado Actual (30 Abril 2026)

### 🎯 Objetivo Principal
Migrar de SQLite a PostgreSQL y unificar el diseño de la aplicación con paleta de colores "Tierra".

### ✅ Trabajo Completado

#### 1. **Diseño Unificado - Paleta Tierra**
- Colores CSS variables en `frontend/src/index.css`:
  - `--cream`: #FAF7F2
  - `--warm`: #F2EDE4
  - `--sand`: #E8DDD0
  - `--clay`: #C4A882 (botones primarios)
  - `--terra`: #8B6F47
  - `--deep`: #2C2016 (headers)
  - `--ink`: #1A1208 (texto)
- Tipografía: DM Sans (sans) y DM Serif Display (heading)
- Actualizado en: Login, Header, Modal, Dashboard, AdminUsuarios, App

#### 2. **Migración SQLite → PostgreSQL**
- **Backend** (`backend/src/app.module.ts`):
  - Cambio de `better-sqlite3` a PostgreSQL
  - Configuración con variables de entorno:
    - DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME
  - `synchronize: false` en producción (true en desarrollo)
  - SSL configurado para producción

- **Entidades** - Tipos de datos compatibles PostgreSQL:
  - `paciente.entity.ts`: `datetime` → `timestamp`
  - `usuario.entity.ts`: `datetime` → `timestamp`
  - `token-revocado.entity.ts`: `datetime` → `timestamp`

- **Frontend** (`frontend/src/services/`):
  - `authService.ts` y `usuariosService.ts`: ahora usan `import.meta.env.VITE_API_URL`
  - Fallback a `http://localhost:3000` para desarrollo local

#### 3. **Configuración Render**
- **Backend (adultos-mayores-backend)**:
  - Variables de entorno configuradas:
    - NODE_ENV: production
    - DB_HOST: dpg-d7ltnllckfvc739crllg-a
    - DB_PORT: 5432
    - DB_USERNAME: admin
    - DB_PASSWORD: 5ZR21MkYYQN1ad8gqtqPJvVmpQAHydLa
    - DB_NAME: centros_diurnos_db
    - JWT_SECRET, ENCRYPTION_KEY, CORS_ORIGIN

- **BD PostgreSQL** (Render):
  - Nombre: centros-diurnos-db
  - Región: Oregon (US West)
  - Plan: Free (256 MB RAM, 0.1 CPU, 1 GB Storage)
  - Usuario: admin
  - Estado: ✅ Activa y funcionando

#### 4. **Estado de Deployments**
- ✅ **Frontend**: Deployed (https://adultos-mayores-frontend.onrender.com)
- ✅ **Backend**: Deployed (https://adultos-mayores-backend.onrender.com)
  - NestJS iniciado correctamente
  - Todos los módulos cargados
  - PostgreSQL conectado
  - Rutas mapeadas

### 📋 Commits Recientes
```
c60117c - Fix: Cambiar datetime a timestamp para compatibilidad con PostgreSQL
1c5add2 - Fix: Usar variable de entorno VITE_API_URL en servicios
55e21bc - Actualizar render.yaml para configuración de PostgreSQL
5cf9324 - Cambiar de SQLite a PostgreSQL para persistencia de datos
```

### 🔑 Credenciales de Prueba
- Usuario: `admin`
- Contraseña: `admin123`
- Rol: admin (se crea automáticamente en seeder)

### 🚀 URL de Acceso
- **Frontend**: https://adultos-mayores-frontend.onrender.com
- **Backend API**: https://adultos-mayores-backend.onrender.com
- **Repo**: https://github.com/thielefelipe/adultos-mayores-app

### ⚠️ Notas Importantes
1. La BD PostgreSQL está en plan Free de Render (limitaciones de recursos)
2. El backend está configurado con `synchronize: true` en desarrollo para crear tablas automáticamente
3. Los datos persisten ahora correctamente en PostgreSQL (no hay pérdida en redeploys)
4. El diseño es 100% consistente en toda la app (login, dashboard, modales, formularios)
5. El frontend ahora apunta correctamente al backend en Render (no a localhost)

#### 5. **Validación de Sesión Expirada** (30 Abril 2026)
- **Problema**: Token se restauraba de localStorage sin validar expiración
- **Solución**: 
  - Frontend valida localmente si token expiró (decodificando JWT)
  - Frontend valida con servidor usando endpoint `/auth/validate`
  - Si token está expirado o rechazado, usuario ve login
- **Cambios**:
  - `AuthContext.tsx`: Agregada función `isTokenExpired()` y validación al inicializar
  - `authService.ts`: Agregado método `validateToken()`
  - `auth.controller.ts`: Agregado endpoint GET `/auth/validate`

### ✔️ Próximos Pasos (si hay problemas)
1. Verificar logs en Render si hay errores
2. Asegurar que el admin user existe en la BD
3. Verificar CORS si hay errores de conexión frontend-backend
4. Considerar upgrade de plan PostgreSQL si se llena el storage
5. Si sesión no expira: verificar que JWT_EXPIRE esté configurado en backend (default: 24h)
