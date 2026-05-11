import { useAuth } from './contexts/AuthContext';
import { useHeartbeat } from './hooks/useHeartbeat';
import { useInactivityLogout } from './hooks/useInactivityLogout';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';
import { AnalystDashboard } from './pages/AnalystDashboard';
import { SessionExpired } from './components/SessionExpired';
import { DesignsViewer } from './components/DesignsViewer';
import './App.css';

function App() {
  const { isAutenticado, isLoading, logout, usuario, sessionExpired, setSessionExpired } = useAuth();
  useHeartbeat(); // Mantener servidor activo con heartbeat cada 10 minutos
  useInactivityLogout(); // Cerrar sesión después de 5 minutos de inactividad
  const isDesignsView = window.location.pathname === '/designs';

  if (isLoading && !isDesignsView) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  const handleLoginSuccess = () => {
    setSessionExpired(false);
  };

  if (isDesignsView) {
    return <DesignsViewer />;
  }

  if (sessionExpired) {
    return <SessionExpired onLogin={handleLoginSuccess} />;
  }

  if (isAutenticado) {
    // Redirigir según el rol del usuario
    if (usuario?.rol === 'admin') {
      return <Dashboard onLogout={handleLogout} />;
    } else if (usuario?.rol === 'operador' || usuario?.rol === 'analista') {
      return <AnalystDashboard onLogout={handleLogout} />;
    }
  }

  return <Login onLoginSuccess={handleLoginSuccess} />;
}

export default App
