import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const INACTIVIDAD_TIMEOUT = 30 * 60 * 1000; // 30 minutos

export function useHeartbeat() {
  const { token, setSessionExpired, logout } = useAuth();
  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Heartbeat del SERVIDOR cada 10 minutos (sin autenticación, solo para mantenerlo activo)
    const sendServerHeartbeat = async () => {
      try {
        await fetch(`${API_URL}`, {
          method: 'GET',
        });
        console.log('🔄 Servidor activo');
      } catch (error) {
        console.error('Error en heartbeat del servidor:', error);
      }
    };

    // Enviar heartbeat del servidor inmediatamente
    sendServerHeartbeat();

    // Configurar intervalo de 10 minutos
    const serverInterval = setInterval(sendServerHeartbeat, 10 * 60 * 1000);

    return () => clearInterval(serverInterval);
  }, []);

  useEffect(() => {
    if (!token) return;

    // Función para resetear el timeout de inactividad
    const resetInactivityTimeout = () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }

      inactivityTimeoutRef.current = setTimeout(async () => {
        console.log('⏱️ Sesión expirada por inactividad');
        await logout();
        setSessionExpired(true);
      }, INACTIVIDAD_TIMEOUT);
    };

    // Eventos que indican actividad del usuario
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    events.forEach((event) => {
      window.addEventListener(event, resetInactivityTimeout);
    });

    // Iniciar timeout de inactividad
    resetInactivityTimeout();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetInactivityTimeout);
      });
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [token, logout, setSessionExpired]);
}
