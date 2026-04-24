import { useAuth } from '../contexts/AuthContext';
import './Header.css';

interface HeaderProps {
  onLogout: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  const { usuario } = useAuth();

  const handleLogout = async () => {
    if (confirm('¿Deseas cerrar sesión?')) {
      onLogout();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>🏥 Centro de Gestión</h1>
        </div>

        <div className="user-info">
          <span className="welcome">
            Bienvenido, <strong>{usuario?.nombre}</strong>
          </span>
          <span className={`rol-badge rol-${usuario?.rol}`}>
            {usuario?.rol}
          </span>
          <button className="btn-logout" onClick={handleLogout}>
            🚪 Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
