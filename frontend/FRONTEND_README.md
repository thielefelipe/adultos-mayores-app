# Frontend - Centro de Gestión Adultos Mayores

## 🚀 Estructura Implementada

### Servicios
- `services/authService.ts` - Autenticación (login/logout)
- `services/usuariosService.ts` - CRUD de usuarios

### Contexto
- `contexts/AuthContext.tsx` - Gestión global de autenticación

### Componentes
- `components/Login.tsx` - Página de login
- `components/Header.tsx` - Barra superior con usuario y logout
- `components/AdminUsuarios.tsx` - Tabla de usuarios (solo admin)
- `components/ModalEliminarUsuario.tsx` - Modal para eliminar usuario
- `components/ModalRestablecerContrasena.tsx` - Modal para restablecer contraseña
- `components/ModalCrearUsuario.tsx` - Modal para crear usuario
- `components/Modal.css` - Estilos compartidos para modales

### Páginas
- `pages/Dashboard.tsx` - Dashboard principal

## 📋 Flujo de la Aplicación

```
1. Usuario abre la app
2. Si no está autenticado → Muestra página de Login
3. Si está autenticado → Muestra Dashboard
4. En Dashboard (solo admin):
   - Ve tabla de usuarios
   - Puede crear usuario (botón ➕)
   - Puede restablecer contraseña (botón 🔑)
   - Puede eliminar usuario (botón 🗑️)
5. Header permite logout (botón 🚪)
```

## ⚙️ Instalación y Ejecución

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar servidor de desarrollo
```bash
npm run dev
```

Acceder a `http://localhost:5173`

### 3. Credenciales de prueba
```
Usuario: admin
Contraseña: admin123
```

## 📱 Características Implementadas

✅ **Login/Logout**
- Formulario de login con validación
- Persistencia de token en localStorage
- Logout revoca token en servidor
- Carga de usuario autenticado al recargar página

✅ **Panel de Administración**
- Tabla de usuarios activos
- Filtrar por rol con badges de color
- Crear nuevo usuario con formulario validado
- Editar datos del usuario (próxima versión)
- Restablecer contraseña con confirmación
- Eliminar usuario (soft delete) con confirmación

✅ **Modales de Confirmación**
- Modal para eliminar usuario con contraseña
- Modal para restablecer contraseña
- Modal para crear usuario
- Validación de formularios

✅ **Seguridad**
- Tokens guardados en localStorage
- Contexto de autenticación global
- Protección de rutas (solo admin puede ver usuarios)
- Confirmación de contraseña para operaciones sensibles

✅ **UI/UX**
- Diseño responsivo (mobile-friendly)
- Tema gradiente morado
- Iconos emoji para acciones rápidas
- Feedback visual (loading, error messages)
- Tabla moderna con hover effects

## 🎨 Estilos

### Colores
- **Primario**: Gradiente púrpura (#667eea → #764ba2)
- **Éxito**: Verde (#28a745)
- **Error**: Rojo (#dc3545)
- **Fondo**: Gris claro (#f5f5f5)

### Componentes con Estilo
- Badges de rol con colores diferentes
- Botones con transiciones
- Modales con sombra y overlay
- Tablas con hover effects
- Inputs con focus states

## 📁 Estructura de Carpetas

```
frontend/src/
├── components/
│   ├── Login.tsx
│   ├── Login.css
│   ├── Header.tsx
│   ├── Header.css
│   ├── AdminUsuarios.tsx
│   ├── AdminUsuarios.css
│   ├── ModalEliminarUsuario.tsx
│   ├── ModalRestablecerContrasena.tsx
│   ├── ModalCrearUsuario.tsx
│   └── Modal.css
├── contexts/
│   └── AuthContext.tsx
├── pages/
│   └── Dashboard.tsx
├── services/
│   ├── authService.ts
│   └── usuariosService.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 🔌 Conexión con Backend

El frontend se conecta a `http://localhost:3000` (configurable en servicios)

### Endpoints Usados

**Auth**
- `POST /auth/login` - Iniciar sesión
- `POST /auth/logout` - Cerrar sesión

**Usuarios**
- `GET /usuarios` - Listar usuarios
- `POST /usuarios` - Crear usuario
- `POST /usuarios/:id/restablecer-contrasena` - Restablecer contraseña
- `DELETE /usuarios/:id` - Eliminar usuario

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| `CORS error` | Verifica que backend está en http://localhost:3000 |
| `Token inválido` | Limpiar localStorage y login de nuevo |
| `Botones no funcionan` | Verifica que backend está corriendo |
| `No se ven usuarios` | Login con usuario admin |

## 📝 Próximas Mejoras

- [ ] Editar usuario (nombre, rol)
- [ ] Cambiar propia contraseña
- [ ] Búsqueda de usuarios
- [ ] Paginación de usuarios
- [ ] Tema oscuro
- [ ] Internacionalización (i18n)
- [ ] Modales con animaciones
- [ ] Toast notifications

## 👨‍💻 Variables de Entorno

Si necesitas cambiar la URL del backend, edita:
```typescript
// frontend/src/services/authService.ts
const API_URL = 'http://localhost:3000';
```
