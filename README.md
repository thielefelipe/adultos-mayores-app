# Centros Diurnos — Línea Base 2025

Plataforma web centralizada para gestión integral de adultos mayores en centros diurnos.

**Cumplimiento**: LGPD/GDPR, Auditoría completa, Encriptación de datos sensibles.

---

## 📁 Estructura del Proyecto

```
.
├── backend/              # API NestJS
│   ├── src/
│   │   ├── auth/         # Autenticación JWT
│   │   ├── pacientes/    # CRUD de pacientes
│   │   ├── usuarios/     # Gestión de usuarios
│   │   ├── audit/        # Log de auditoría
│   │   ├── config/       # Configuración
│   │   └── main.ts
│   └── package.json
│
├── frontend/             # Aplicación React + TypeScript
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── pages/        # Páginas
│   │   ├── api/          # Cliente HTTP
│   │   └── App.tsx
│   └── package.json
│
├── .env.example          # Variables de entorno (copiar a .env)
├── .gitignore
└── README.md
```

---

## 🚀 Instalación Local

### Requisitos
- **Node.js** 18+
- **PostgreSQL** 13+ (o usando Docker)
- **npm** 9+

### Paso 1: Configuración Base

```bash
# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus valores (DB_PASSWORD, JWT_SECRET, etc)
# ⚠️ IMPORTANTE: Cambiar valores por defecto en producción
```

### Paso 2: Base de Datos

**Opción A: PostgreSQL instalado localmente**
```bash
# Crear base de datos
createdb centros_diurnos_db

# (Opcional) Crear usuario dedicado
psql -c "CREATE USER admin WITH PASSWORD 'your_secure_password';"
psql -c "ALTER ROLE admin CREATEDB;"
```

**Opción B: Docker**
```bash
docker run --name postgres-cd -e POSTGRES_PASSWORD=your_secure_password \
  -e POSTGRES_DB=centros_diurnos_db -p 5432:5432 -d postgres:16
```

### Paso 3: Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend estará en: `http://localhost:3000`

### Paso 4: Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend estará en: `http://localhost:5173`

---

## 🔐 Seguridad

- ✅ JWT con expiración de 24h
- ✅ Encriptación AES-256 para RUT, teléfono, diagnósticos
- ✅ Auditoría completa: quién, qué, cuándo, IP
- ✅ HTTPS obligatorio en producción
- ✅ Contraseñas hasheadas con bcrypt
- ✅ LGPD/GDPR compliance

---

## 📋 Funcionalidades

### Pacientes
- ✅ Registro completo (datos personales, dependencia, instrumentos VGI)
- ✅ Búsqueda y filtrado
- ✅ Edición y eliminación (soft delete)
- ✅ Exportar a CSV
- ✅ Respaldo/Restauración JSON

### Evaluaciones
- ✅ Instrumentos VGI: Barthel, Pfeiffer, Lawton, TUG, Minimental, Yesavage, EQ-5D
- ✅ Seguimiento trimestral con puntuación
- ✅ Cálculo automático de índices

### Auditoría
- ✅ Historial completo de cambios
- ✅ Vista por usuario y rango de fechas
- ✅ Trazabilidad de acciones

### Usuarios
- ✅ 3 roles: Admin, Operador, Analista
- ✅ Gestión centralizada
- ✅ Último acceso registrado

---

## 🧪 Testing

```bash
# Backend
cd backend
npm run test
npm run test:e2e

# Frontend
cd frontend
npm run test
```

---

## 📦 Deployment

### DigitalOcean App Platform (Recomendado)

1. **Crear cuenta** en [DigitalOcean](https://www.digitalocean.com)
2. **Conectar repo GitHub** en App Platform
3. **Configurar variables** en el dashboard
4. **Deploy automático** en cada push

Costo aproximado: $27/mes (app + PostgreSQL manejado)

---

## 📞 Soporte

Para problemas, crea un issue en el repositorio o contacta a tu administrador.

---

## 📄 Licencia

Proyecto privado - Centro de Adultos Mayores SENAMA.
