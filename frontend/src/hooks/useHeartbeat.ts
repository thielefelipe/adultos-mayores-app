import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function useHeartbeat() {
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    // Enviar heartbeat inmediatamente al montar
    const sendHeartbeat = async () => {
      try {
        await fetch(`${API_URL}/usuarios/heartbeat`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('✅ Heartbeat enviado');
      } catch (error) {
        console.error('Error al enviar heartbeat:', error);
      }
    };

    // Enviar heartbeat inmediatamente
    sendHeartbeat();

    // Configurar intervalo de 10 minutos (600000 ms)
    const interval = setInterval(sendHeartbeat, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [token]);
}
