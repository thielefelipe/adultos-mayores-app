import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usuariosService, type Usuario } from '../services/usuariosService';
import { ModalEliminarUsuario } from './ModalEliminarUsuario';
import { ModalRestablecerContrasena } from './ModalRestablecerContrasena';
import { ModalCrearUsuario } from './ModalCrearUsuario';
import { ModalEditarUsuario } from './ModalEditarUsuario';
import './AdminUsuarios.css';

export function AdminUsuarios() {
  const { token, usuario } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState<any>(null);
  const [exportando, setExportando] = useState(false);

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
      // En desarrollo, usar datos mock si la API falla
      if (import.meta.env.DEV) {
        const usuariosMock: Usuario[] = [
          {
            id: '1',
            username: 'admin',
            nombre: 'Administrador',
            rol: 'admin',
            activo: true,
            creado: new Date().toISOString(),
            ultimoAcceso: new Date().toISOString(),
          },
          {
            id: '2',
            username: 'operador1',
            nombre: 'Operador Uno',
            rol: 'operador',
            activo: true,
            creado: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            ultimoAcceso: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            username: 'analista1',
            nombre: 'Analista Uno',
            rol: 'analista',
            activo: true,
            creado: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            ultimoAcceso: new Date().toISOString(),
          },
        ];
        setUsuarios(usuariosMock);
      } else {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      }
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

  const handleExportar = async () => {
    try {
      setExportando(true);
      usuariosService.exportarExcel(usuarios);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al exportar');
    } finally {
      setExportando(false);
    }
  };

  if (loading) {
    return <div className="loading">⏳ Cargando usuarios...</div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>👥 Gestión de Usuarios</h2>
        <div className="header-buttons">
          {usuario && usuario.rol === 'admin' && (
            <button
              className="btn-exportar"
              onClick={handleExportar}
              disabled={exportando}
              title="Exportar usuarios a Excel"
            >
              {exportando ? '⏳ Exportando...' : '📊 Exportar Excel'}
            </button>
          )}
          <button className="btn-crear" onClick={handleCrear}>
            ➕ Crear Usuario
          </button>
        </div>
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
