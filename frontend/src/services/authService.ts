const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (import.meta.env.DEV) {
    return 'http://localhost:3000/api';
  }
  // Production
  const host = window.location.hostname;
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return 'http://localhost:3000/api';
  }
  // En Render, usa el dominio del backend
  return 'https://adultos-mayores-backend.onrender.com/api';
};

const API_URL = getApiUrl();

export interface LoginResponse {
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
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Credenciales inválidas');
    }

    return response.json();
  },

  async logout(token: string): Promise<void> {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  setToken(token: string): void {
    localStorage.setItem('token', token);
  },

  getUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  },

  setUsuario(usuario: any): void {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  },

  clearAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },
};
