import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usuariosService, type Usuario } from '../services/usuariosService';
import { ModalEliminarUsuario } from './ModalEliminarUsuario';
import { ModalRestablecerContrasena } from './ModalRestablecerContrasena';
import { ModalCrearUsuario } from './ModalCrearUsuario';
import { ModalEditarUsuario } from './ModalEditarUsuario';
import './AdminUsuarios.css';

export function AdminUsuarios() {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState<any>(null);

  useEffect(() => {
    cargarUsuarios();
  }, [token]);

  const cargarUsuarios = async () => {
    if (!token) return;
    setLoading(true);
    setError('');

    try {
      const data = await usuariosService.obtenerTodos(token);
      setUsuarios(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = (usuarioId: string) => {
    setShowModal({ type: 'eliminar', usuarioId });
  };

  const handleRestablecer = (usuarioId: string) => {
    setShowModal({ type: 'restablecer', usuarioId });
  };

  const handleCrear = () => {
    setShowModal({ type: 'crear' });
  };

  const handleEditar = (usuario: Usuario) => {
    setShowModal({ type: 'editar', usuario });
  };

  const handleModalClose = () => {
    setShowModal(null);
    cargarUsuarios();
  };

  if (loading) {
    return <div className="loading">⏳ Cargando usuarios...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>👥 Gestión de Usuarios</h2>
        <button className="btn-crear" onClick={handleCrear}>
          ➕ Crear Usuario
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="usuarios-table-wrapper">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty-message">
                  No hay usuarios
                </td>
              </tr>
            ) : (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className="username">{usuario.username}</td>
                  <td>{usuario.nombre}</td>
                  <td>
                    <span className={`rol-badge rol-${usuario.rol}`}>
                      {usuario.rol}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      className="btn-action btn-editar"
                      onClick={() => handleEditar(usuario)}
                      title="Editar usuario"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-action btn-restablecer"
                      onClick={() => handleRestablecer(usuario.id)}
                      title="Restablecer contraseña"
                    >
                      🔑
                    </button>
                    <button
                      className="btn-action btn-eliminar"
                      onClick={() => handleEliminar(usuario.id)}
                      title="Eliminar usuario"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal?.type === 'eliminar' && (
        <ModalEliminarUsuario
          usuarioId={showModal.usuarioId}
          usuarios={usuarios}
          onConfirm={handleModalClose}
          onCancel={() => setShowModal(null)}
        />
      )}

      {showModal?.type === 'restablecer' && (
        <ModalRestablecerContrasena
          usuarioId={showModal.usuarioId}
          usuarios={usuarios}
          onConfirm={handleModalClose}
          onCancel={() => setShowModal(null)}
        />
      )}

      {showModal?.type === 'crear' && (
        <ModalCrearUsuario
          onConfirm={handleModalClose}
          onCancel={() => setShowModal(null)}
        />
      )}

      {showModal?.type === 'editar' && showModal?.usuario && (
        <ModalEditarUsuario
          usuario={showModal.usuario}
          onConfirm={handleModalClose}
          onCancel={() => setShowModal(null)}
        />
      )}
    </div>
  );
}
