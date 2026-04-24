import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usuariosService } from '../services/usuariosService';
import './Modal.css';

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ModalCrearUsuario({ onConfirm, onCancel }: ModalProps) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    nombre: '',
    password: '',
    rol: 'operador',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!token) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    if (!formData.username || !formData.nombre || !formData.password) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (formData.username.length < 3) {
      setError('El usuario debe tener al menos 3 caracteres');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await usuariosService.crear(formData, token);
      alert(`✅ Usuario ${formData.nombre} creado exitosamente`);
      onConfirm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>➕ Crear Usuario</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nombre de usuario único"
              disabled={loading}
              autoFocus
            />
            <small>Mínimo 3 caracteres, único</small>
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre completo:</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
            <small>Mínimo 8 caracteres</small>
          </div>

          <div className="form-group">
            <label htmlFor="rol">Rol:</label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="operador">Operador</option>
              <option value="analista">Analista</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button
            className="btn-primary"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? '⏳ Creando...' : '➕ Crear'}
          </button>
        </div>
      </div>
    </div>
  );
}
