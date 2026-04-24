import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usuariosService, type Usuario } from '../services/usuariosService';
import './Modal.css';

interface ModalProps {
  usuarioId: string;
  usuarios: Usuario[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function ModalEliminarUsuario({ usuarioId, usuarios, onConfirm, onCancel }: ModalProps) {
  const { token } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const usuario = usuarios.find((u) => u.id === usuarioId);

  if (!usuario || !token) return null;

  const handleConfirm = async () => {
    if (!password) {
      setError('Debes ingresar tu contraseña para confirmar');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await usuariosService.eliminar(usuarioId, password, token);
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
          <h3>⚠️ Eliminar Usuario</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <p>¿Estás seguro de que deseas eliminar a <strong>{usuario.nombre}</strong>?</p>
          <p className="info-text">
            Los datos se conservarán en la base de datos y el usuario podrá ser reactivado si es necesario.
          </p>

          <div className="form-group">
            <label htmlFor="password">Tu contraseña (para confirmar):</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button
            className="btn-danger"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? '⏳ Eliminando...' : '🗑️ Eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
