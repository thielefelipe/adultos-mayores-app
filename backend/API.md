# API - Centros Diurnos

## Endpoints Implementados (Fase 1)

### Autenticación

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response (200):
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "uuid",
    "username": "admin",
    "nombre": "Administrador",
    "rol": "admin"
  }
}
```

### Pacientes (Requiere JWT en header)

#### Crear Paciente
```
POST /pacientes
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "rut": "123456789",
  "dv": "5",
  "nombre": "Juan Pérez García",
  "edad": 75,
  "sexo": "M",
  "telefono": "+56912345678",
  "comuna": "Santiago",
  "escolaridad": "Primaria",
  "dependencia": "Severa",
  "barthel1": 45,
  "pfeiffer1": 3,
  "lawton1": 6,
  "mini1": 24,
  "yesa1": 8,
  "eq1": "Más o menos"
}

Response (201):
{
  "id": "uuid",
  "rut": "123456789",
  "nombre": "Juan Pérez García",
  "fechaRegistro": "2025-04-21T10:30:00Z",
  "creadoPor": "admin",
  ...
}
```

#### Listar Pacientes
```
GET /pacientes?pagina=1&limite=20
Authorization: Bearer <access_token>

Response (200):
{
  "datos": [...],
  "total": 45,
  "pagina": 1,
  "totalPaginas": 3
}
```

#### Buscar Pacientes
```
GET /pacientes/buscar?termino=Juan&pagina=1
Authorization: Bearer <access_token>

Response (200):
{
  "datos": [...],
  "total": 2,
  ...
}
```

#### Obtener Paciente por ID
```
GET /pacientes/{id}
Authorization: Bearer <access_token>

Response (200):
{
  "id": "uuid",
  "nombre": "Juan Pérez García",
  ...
}
```

#### Actualizar Paciente
```
PUT /pacientes/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "barthel2": 50,
  "pfeiffer2": 2,
  "mini2": 26
}

Response (200):
{
  "id": "uuid",
  "modificadoPor": "admin",
  "modificadoEn": "2025-04-21T11:00:00Z",
  ...
}
```

#### Eliminar Paciente (Soft Delete)
```
DELETE /pacientes/{id}
Authorization: Bearer <access_token>

Response (204): No Content
```

#### Exportar a CSV
```
GET /pacientes/export/csv
Authorization: Bearer <access_token>

Response (200):
{
  "data": "ID,RUT,Nombre,...",
  "filename": "linea_base_2025.csv"
}
```

### Auditoría

#### Obtener Todos los Logs
```
GET /audit/logs?limite=100
Authorization: Bearer <access_token>

Response (200):
[
  {
    "id": "uuid",
    "usuario": "admin",
    "accion": "CREATE",
    "entidad": "paciente",
    "timestamp": "2025-04-21T10:30:00Z",
    ...
  },
  ...
]
```

#### Obtener Logs de Usuario
```
GET /audit/usuario/{username}?limite=50
Authorization: Bearer <access_token>

Response (200): [...]
```

#### Obtener Logs de una Entidad
```
GET /audit/entidad/{entidad}/{id}
Authorization: Bearer <access_token>

Response (200): [...]
```

---

## Autenticación

Todos los endpoints excepto `/auth/login` requieren:
```
Authorization: Bearer <access_token>
```

El token expira en 24 horas por defecto.

---

## Errores

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "RUT ya existe en el sistema"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Credenciales inválidas" | "Token inválido o expirado"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Paciente no encontrado"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Error interno del servidor"
}
```
