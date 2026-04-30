import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
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
  sessionExpired: boolean;
  login: (usuario: Usuario, token: string) => void;
  logout: () => Promise<void>;
  setSessionExpired: (expired: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Función para decodificar JWT y verificar expiración
function isTokenExpired(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;

    const decoded = JSON.parse(atob(parts[1]));
    const expirationTime = decoded.exp * 1000; // convertir a milisegundos
    const currentTime = Date.now();

    return currentTime > expirationTime;
  } catch {
    return true; // Si no se puede decodificar, considerar como expirado
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = authService.getToken();
      const storedUsuario = authService.getUsuario();

      if (storedToken && storedUsuario) {
        // Verificar si el token ha expirado localmente
        if (isTokenExpired(storedToken)) {
          console.log('🔒 Token expirado detectado localmente');
          authService.clearAuth();
          setIsLoading(false);
          return;
        }

        // Verificar con el servidor si el token sigue siendo válido
        try {
          const isValid = await authService.validateToken(storedToken);
          if (isValid) {
            setToken(storedToken);
            setUsuario(storedUsuario);
          } else {
            console.log('🔒 Token rechazado por el servidor');
            authService.clearAuth();
          }
        } catch (error) {
          console.log('🔒 Error validando token con servidor:', error);
          authService.clearAuth();
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
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
    // Limpiar la vista guardada del Dashboard para que siempre comience en 'inicio'
    localStorage.removeItem('dashboardVista');
    // Limpiar el hash de la URL para que no se restaure la última vista
    window.location.hash = '';
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        isAutenticado: !!token && !sessionExpired,
        isLoading,
        sessionExpired,
        login,
        logout,
        setSessionExpired,
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
