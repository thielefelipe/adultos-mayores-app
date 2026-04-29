import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const INACTIVIDAD_TIMEOUT = 5 * 60 * 1000; // 5 minutos

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

  // Función para resetear el timeout de inactividad
  const resetInactivityTimeout = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }

    console.log('⏲️ Timeout de inactividad reseteado (próxima expiración en 5 minutos)');
    inactivityTimeoutRef.current = setTimeout(async () => {
      console.log('⏱️ ⚠️ SESIÓN EXPIRADA POR INACTIVIDAD (5 minutos sin actividad)');
      await logout();
      setSessionExpired(true);
    }, INACTIVIDAD_TIMEOUT);
  }, [logout, setSessionExpired]);

  useEffect(() => {
    if (!token) return;

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
  }, [token, resetInactivityTimeout]);
}
