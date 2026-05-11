import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutos en milisegundos

export function useInactivityLogout() {
  const { isAutenticado, logout } = useAuth();

  useEffect(() => {
    if (!isAutenticado) return;

    let timeoutId: NodeJS.Timeout;
    let lastActivityTime = Date.now();

    const resetInactivityTimer = () => {
      lastActivityTime = Date.now();
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        console.log('⏱️ Sesión expirada por inactividad');
        logout();
      }, INACTIVITY_TIMEOUT);
    };

    // Event listeners para detectar actividad del usuario
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // Iniciar el timer
    resetInactivityTimer();

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [isAutenticado, logout]);
}
