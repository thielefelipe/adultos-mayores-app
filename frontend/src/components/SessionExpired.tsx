import './SessionExpired.css';

interface SessionExpiredProps {
  onLogin: () => void;
}

export function SessionExpired({ onLogin }: SessionExpiredProps) {
  return (
    <div className="session-expired-container">
      <div className="session-expired-content">
        <div className="expired-icon">⏱️</div>
        <h1>Sesión Caducada</h1>
        <p>Tu sesión ha expirado por inactividad o ha sido cerrada.</p>
        <p className="expired-subtext">Por seguridad, necesitas iniciar sesión nuevamente.</p>
        <button className="btn-login" onClick={onLogin}>
          Volver al Login
        </button>
      </div>
    </div>
  );
}
