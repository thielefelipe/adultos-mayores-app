# Setup - Guía de Instalación Local

## 1. Requisitos Previos

### Windows
- **Node.js 18+** → [Descargar](https://nodejs.org/)
- **PostgreSQL 13+** → [Descargar](https://www.postgresql.org/download/windows/)
  - O usar **Docker** (recomendado para Windows)

### macOS/Linux
- **Node.js 18+** → `brew install node`
- **PostgreSQL** → `brew install postgresql` o Docker

---

## 2. Opción A: PostgreSQL Local (Windows)

### Instalar PostgreSQL
1. Descargar desde [postgresql.org](https://www.postgresql.org/download/windows/)
2. Ejecutar instalador
3. Anotar la contraseña del usuario `postgres`
4. Seleccionar puerto `5432` (default)
5. Completar instalación

### Crear Base de Datos
```bash
# Abrir pgAdmin (incluido en PostgreSQL) o usar línea de comandos

# En terminal (Windows PowerShell/CMD):
psql -U postgres

# En psql:
CREATE DATABASE centros_diurnos_db;
CREATE USER admin WITH PASSWORD 'admin';
ALTER ROLE admin CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE centros_diurnos_db TO admin;
\q
```

### Configurar .env
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin
DB_NAME=centros_diurnos_db
```

---

## 2. Opción B: PostgreSQL con Docker (Recomendado)

### Instalar Docker
- **Windows/Mac**: [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Linux**: `sudo apt-get install docker.io docker-compose`

### Crear contenedor PostgreSQL
```bash
docker run --name postgres-cd \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=admin \
  -e POSTGRES_DB=centros_diurnos_db \
  -p 5432:5432 \
  -d postgres:16
```

### Verificar que está corriendo
```bash
docker ps  # Deberías ver el contenedor 'postgres-cd'

# Conectar desde cliente (opcional)
psql -h localhost -U admin -d centros_diurnos_db
```

### Detener/Iniciar contenedor
```bash
docker stop postgres-cd
docker start postgres-cd
```

---

## 3. Instalar y Ejecutar Backend

```bash
cd backend

# Instalar dependencias
npm install

# (Primero asegúrate que PostgreSQL está corriendo)

# Ejecutar en modo desarrollo
npm run start:dev

# Deberías ver:
# [NestJS] 1:30:00 PM [NestFactory] Starting Nest application...
# [NestJS] 1:30:01 PM [InstanceLoader] AppModule dependencies initialized
# [Nest] 1:30:01 PM - 04/21/2025, 1:30:01 PM   [NestApplication] Nest application successfully started
# [Nest] 1:30:01 PM - 04/21/2025, 1:30:01 PM   [RoutesResolver] AppController {/}:
```

API estará en: **http://localhost:3000**

### Verificar que funciona
```bash
# En otra terminal
curl http://localhost:3000
# Deberías recibir respuesta

# Intentar login (debería fallar - admin no existe aún)
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## 4. Instalar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Deberías ver:
# VITE v5.X.X  ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

Frontend estará en: **http://localhost:5173**

---

## 5. Próximos Pasos

- [ ] Implementar script de seed (crear usuario admin por defecto)
- [ ] Crear interfaz de registro de usuarios (admin panel)
- [ ] Desarrollar componentes React
- [ ] Conectar frontend con backend
- [ ] Testing (unitarios + e2e)

---

## 🆘 Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:5432"
**Problema**: PostgreSQL no está corriendo

**Solución Windows**:
```bash
# Iniciar servicio PostgreSQL
# En Services (servicios.msc) busca "postgresql" y Iniciar

# O en PowerShell:
Get-Service postgresql-x64-16 | Start-Service
```

**Solución Docker**:
```bash
docker start postgres-cd
```

### Error: "Database centros_diurnos_db does not exist"
**Solución**: Ejecutar comandos de creación de BD (ver sección 2 arriba)

### Error: "npm: command not found"
**Solución**: Node.js no instalado. [Descargar e instalar](https://nodejs.org/)

### Frontend no conecta a Backend
Verificar en `.env` que `VITE_API_URL=http://localhost:3000/api`

---

## 📝 Notas

- El backend usa **TypeORM** que autogenera las tablas si `synchronize: true` en desarrollo
- Las contraseñas se hashean con **bcrypt** (10 rounds)
- Los tokens JWT expiran en **24h**
- Los datos sensibles se pueden encriptar con **AES-256** (próxima fase)
