import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';

interface Usuario {
  id: string;
  username: string;
  nombre: string;
  rol: 'admin' | 'operador' | 'analista';
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  isAutenticado: boolean;
  isLoading: boolean;
  login: (usuario: Usuario, token: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();
    const usuario = authService.getUsuario();

    if (token && usuario) {
      setToken(token);
      setUsuario(usuario);
    }

    setIsLoading(false);
  }, []);

  const login = (nuevoUsuario: Usuario, nuevoToken: string) => {
    setUsuario(nuevoUsuario);
    setToken(nuevoToken);
    authService.setToken(nuevoToken);
    authService.setUsuario(nuevoUsuario);
  };

  const logout = async () => {
    if (token) {
      await authService.logout(token);
    }
    setUsuario(null);
    setToken(null);
    authService.clearAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        isAutenticado: !!token,
        isLoading,
        login,
        logout,
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
