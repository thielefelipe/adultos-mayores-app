const API_URL = 'http://localhost:3000';

export interface Usuario {
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

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Error al crear usuario');
    }
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

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Error al restablecer contraseña');
    }
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

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Error al cambiar contraseña');
    }
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

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Error al eliminar usuario');
    }
    return response.json();
  },
};
