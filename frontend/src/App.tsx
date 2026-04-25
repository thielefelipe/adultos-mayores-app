import { useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';
import { AnalystDashboard } from './pages/AnalystDashboard';
import { DesignsViewer } from './components/DesignsViewer';
import './App.css';

function App() {
  const { isAutenticado, isLoading, logout, usuario } = useAuth();
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
    // El usuario ya está autenticado en el contexto
  };

  if (isDesignsView) {
    return <DesignsViewer />;
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
