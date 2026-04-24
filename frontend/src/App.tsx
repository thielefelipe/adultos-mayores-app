import { useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';
import './App.css';

function App() {
  const { isAutenticado, isLoading, logout } = useAuth();

  if (isLoading) {
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

  return isAutenticado ? (
    <Dashboard onLogout={handleLogout} />
  ) : (
    <Login onLoginSuccess={handleLoginSuccess} />
  );
}

export default App
