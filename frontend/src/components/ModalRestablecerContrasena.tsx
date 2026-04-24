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

export function ModalRestablecerContrasena({ usuarioId, usuarios, onConfirm, onCancel }: ModalProps) {
  const { token } = useAuth();
  const [passwordNueva, setPasswordNueva] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const usuario = usuarios.find((u) => u.id === usuarioId);

  if (!usuario || !token) return null;

  const handleConfirm = async () => {
    if (!passwordNueva || passwordNueva.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await usuariosService.restablecerContrasena(usuarioId, passwordNueva, token);
      alert(`✅ Contraseña restablecida para ${usuario.nombre}`);
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
          <h3>🔑 Restablecer Contraseña</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <p>Restablecer contraseña para: <strong>{usuario.nombre}</strong></p>

          <div className="form-group">
            <label htmlFor="password">Nueva contraseña:</label>
            <input
              id="password"
              type="password"
              value={passwordNueva}
              onChange={(e) => setPasswordNueva(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              disabled={loading}
              autoFocus
            />
            <small>Mínimo 8 caracteres</small>
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
            {loading ? '⏳ Restableciendo...' : '🔑 Restablecer'}
          </button>
        </div>
      </div>
    </div>
  );
}
