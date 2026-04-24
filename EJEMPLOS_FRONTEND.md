# Ejemplos de Implementación en Frontend

Este documento muestra ejemplos de cómo integrar los nuevos endpoints en React/TypeScript.

## 1. Servicio de Autenticación

```typescript
// services/authService.ts
const API_URL = 'http://localhost:3000';

interface LoginResponse {
  access_token: string;
  usuario: {
    id: string;
    username: string;
    nombre: string;
    rol: 'admin' | 'operador' | 'analista';
  };
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }
    
    return response.json();
  },

  async logout(token: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Error al cerrar sesión');
    }
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  clearToken(): void {
    localStorage.removeItem('token');
  },
};
```

## 2. Servicio de Usuarios

```typescript
// services/usuariosService.ts
const API_URL = 'http://localhost:3000';

interface Usuario {
  id: string;
  username: string;
  nombre: string;
  rol: 'admin' | 'operador' | 'analista';
  activo?: boolean;
  creado?: string;
  ultimoAcceso?: string;
}

export const usuariosService = {
  async obtenerTodos(token: string): Promise<Usuario[]> {
    const response = await fetch(`${API_URL}/usuarios`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    if (!response.ok) throw new Error('Error al obtener usuarios');
    return response.json();
  },

  async obtenerPorId(id: string, token: string): Promise<Usuario> {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    
    if (!response.ok) throw new Error('Usuario no encontrado');
    return response.json();
  },

  async crear(
    usuario: { username: string; nombre: string; password: string; rol: string },
    token: string,
  ): Promise<Usuario> {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });
    
    if (!response.ok) throw new Error('Error al crear usuario');
    return response.json();
  },

  async actualizar(
    id: string,
    datos: { nombre?: string; rol?: string },
    token: string,
  ): Promise<Usuario> {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });
    
    if (!response.ok) throw new Error('Error al actualizar usuario');
    return response.json();
  },

  async restablecerContrasena(
    id: string,
    passwordNueva: string,
    token: string,
  ): Promise<{ mensaje: string }> {
    const response = await fetch(`${API_URL}/usuarios/${id}/restablecer-contrasena`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passwordNueva,
        passwordConfirmacion: passwordNueva,
      }),
    });
    
    if (!response.ok) throw new Error('Error al restablecer contraseña');
    return response.json();
  },

  async cambiarContrasena(
    passwordActual: string,
    passwordNueva: string,
    token: string,
  ): Promise<{ mensaje: string }> {
    const response = await fetch(`${API_URL}/usuarios/cambiar-contrasena`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ passwordActual, passwordNueva }),
    });
    
    if (!response.ok) throw new Error('Error al cambiar contraseña');
    return response.json();
  },

  async eliminar(id: string, passwordConfirmacion: string, token: string) {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ passwordConfirmacion }),
    });
    
    if (!response.ok) throw new Error('Error al eliminar usuario');
    return response.json();
  },
};
```

## 3. Componente de Login

```typescript
// components/Login.tsx
import { useState } from 'react';
import { authService } from '../services/authService';

export function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login(username, password);
      authService.setToken(response.access_token);
      onLoginSuccess(response.usuario);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          disabled={loading}
        />
      </div>

      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="admin123"
          disabled={loading}
        />
      </div>

      {error && <div className="error">{error}</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
```

## 4. Componente de Logout

```typescript
// components/LogoutButton.tsx
import { authService } from '../services/authService';

export function LogoutButton({ onLogout }) {
  const handleLogout = async () => {
    const token = authService.getToken();
    
    if (!token) {
      onLogout();
      return;
    }

    try {
      await authService.logout(token);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      authService.clearToken();
      onLogout();
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Cerrar sesión
    </button>
  );
}
```

## 5. Componente de Administración de Usuarios

```typescript
// components/AdminUsuarios.tsx
import { useEffect, useState } from 'react';
import { usuariosService } from '../services/usuariosService';
import { ModalEliminarUsuario } from './ModalEliminarUsuario';
import { ModalRestablecerContrasena } from './ModalRestablecerContrasena';

export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await usuariosService.obtenerTodos(token!);
      setUsuarios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = (usuarioId: string) => {
    setShowModal({ type: 'eliminar', usuarioId });
  };

  const handleRestablecer = (usuarioId: string) => {
    setShowModal({ type: 'restablecer', usuarioId });
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.username}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.rol}</td>
              <td>
                <button onClick={() => handleRestablecer(usuario.id)}>
                  Restablecer contraseña
                </button>
                <button onClick={() => handleEliminar(usuario.id)} className="danger">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal?.type === 'eliminar' && (
        <ModalEliminarUsuario
          usuarioId={showModal.usuarioId}
          token={token!}
          onConfirm={() => {
            cargarUsuarios();
            setShowModal(null);
          }}
          onCancel={() => setShowModal(null)}
        />
      )}

      {showModal?.type === 'restablecer' && (
        <ModalRestablecerContrasena
          usuarioId={showModal.usuarioId}
          token={token!}
          onConfirm={() => setShowModal(null)}
          onCancel={() => setShowModal(null)}
        />
      )}
    </div>
  );
}
```

## 6. Modal de Confirmación para Eliminar

```typescript
// components/ModalEliminarUsuario.tsx
import { useState } from 'react';
import { usuariosService } from '../services/usuariosService';

export function ModalEliminarUsuario({ usuarioId, token, onConfirm, onCancel }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!password) {
      setError('Debes ingresar tu contraseña para confirmar');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await usuariosService.eliminar(usuarioId, password, token);
      onConfirm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>⚠️ Eliminar Usuario</h3>
        <p>¿Estás seguro de que quieres eliminar este usuario?</p>
        <p>Los datos se conservarán en la base de datos.</p>

        <div>
          <label>Confirma tu contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            disabled={loading}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <div className="modal-actions">
          <button onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button onClick={handleConfirm} disabled={loading} className="danger">
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## 7. Manejo de Errores HTTP

```typescript
// utils/handleApiError.ts
export function handleApiError(error: any): string {
  if (error instanceof Response) {
    switch (error.status) {
      case 401:
        return 'No autorizado. Inicia sesión de nuevo.';
      case 403:
        return 'No tienes permiso para hacer esto.';
      case 404:
        return 'Recurso no encontrado.';
      case 400:
        return 'Solicitud inválida. Verifica los datos.';
      case 500:
        return 'Error en el servidor. Intenta más tarde.';
      default:
        return `Error ${error.status}: ${error.statusText}`;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Error desconocido';
}
```

## 8. Context para Autenticación Global

```typescript
// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

interface AuthContextType {
  usuario: any | null;
  token: string | null;
  login: (usuario: any, token: string) => void;
  logout: () => void;
  isAutenticado: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Recuperar token del localStorage en mount
    const token = authService.getToken();
    if (token) {
      setToken(token);
      // Aquí podrías validar el token en el servidor
    }
  }, []);

  const login = (nuevoUsuario: any, nuevoToken: string) => {
    setUsuario(nuevoUsuario);
    setToken(nuevoToken);
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    authService.clearToken();
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        logout,
        isAutenticado: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
}
```

## Resumen

Con estos componentes y servicios tienes una implementación completa de:

✅ Login/Logout funcional  
✅ Gestión de usuarios (CRUD)  
✅ Confirmación de operaciones sensibles  
✅ Manejo de errores  
✅ Autenticación global con Context

Adapta estos ejemplos a tu estilo y estructura actual del frontend.
