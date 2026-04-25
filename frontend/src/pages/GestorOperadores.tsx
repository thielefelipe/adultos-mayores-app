import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usuariosService, type Usuario } from '../services/usuariosService';

interface GestorOperadoresProps {
  onVolver: () => void;
  onLogout: () => void;
}

export function GestorOperadores({ onVolver, onLogout }: GestorOperadoresProps) {
  const { usuario, token } = useAuth();
  const [todosLosUsuarios, setTodosLosUsuarios] = useState<Usuario[]>([]);
  const [usuariosActivos, setUsuariosActivos] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!token) return;

    const cargarDatos = async () => {
      try {
        // Obtener todos los usuarios
        const todos = await usuariosService.obtenerTodos(token);
        const filtrados = todos.filter(u => u.rol === 'operador' || u.rol === 'analista');
        setTodosLosUsuarios(filtrados);

        // Obtener usuarios activos
        const activos = await usuariosService.obtenerActivos(token);
        const activosFiltrados = activos.filter(u => u.rol === 'operador' || u.rol === 'analista');
        setUsuariosActivos(activosFiltrados);

        setCargando(false);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        setCargando(false);
      }
    };

    cargarDatos();

    // Recargar cada 10 segundos
    const interval = setInterval(cargarDatos, 10000);
    return () => clearInterval(interval);
  }, [token]);

  const estaConectado = (usuarioId: string) => {
    return usuariosActivos.some(u => u.id === usuarioId);
  };

  const formatearHora = (fecha?: string) => {
    if (!fecha) return 'Sin registro';
    const date = new Date(fecha);
    const ahora = new Date();
    const diffMs = ahora.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Hace segundos';
    if (diffMins < 60) return `Hace ${diffMins} min`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `Hace ${diffHours}h`;

    return date.toLocaleDateString('es-CL');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFFFFF',
      fontFamily: "'Open Sans', sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: '#003D82',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
      }}>
        <button onClick={onVolver} style={{
          background: 'rgba(255,255,255,.15)',
          color: '#FFFFFF',
          border: '1px solid rgba(255,255,255,.3)',
          padding: '6px 14px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600
        }}>← Volver</button>

        <span style={{ fontSize: 28 }}>MC</span>
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 17 }}>
            Gestión de Operadores y Analistas
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#FFFFFF', fontSize: 13 }}>
            Hola, <strong>{usuario?.nombre || usuario?.username}</strong>
          </span>
          <button onClick={onLogout} style={{
            background: '#0066CC',
            color: '#FFFFFF',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}>Cerrar sesión</button>
        </div>
      </header>

      {/* Contenido */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#003D82',
          marginBottom: 8,
          fontFamily: "'Montserrat', sans-serif"
        }}>Operadores y Analistas</h2>
        <p style={{ color: '#666666', fontSize: 14, marginBottom: 30 }}>
          Total creados: <strong>{todosLosUsuarios.length}</strong> | Conectados ahora: <strong style={{ color: '#0066CC' }}>{usuariosActivos.length}</strong>
        </p>

        {cargando ? (
          <div style={{ textAlign: 'center', color: '#666666', padding: '40px' }}>
            Cargando usuarios...
          </div>
        ) : todosLosUsuarios.length > 0 ? (
          <div style={{
            overflowX: 'auto',
            borderRadius: 8,
            boxShadow: '0px 2px 8px rgba(0,0,0,0.05)'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: '#FFFFFF'
            }}>
              <thead>
                <tr style={{ background: '#003D82' }}>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 14,
                    borderBottom: '2px solid #0066CC'
                  }}>Estado</th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 14,
                    borderBottom: '2px solid #0066CC'
                  }}>Nombre</th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 14,
                    borderBottom: '2px solid #0066CC'
                  }}>Usuario</th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 14,
                    borderBottom: '2px solid #0066CC'
                  }}>Rol</th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 14,
                    borderBottom: '2px solid #0066CC'
                  }}>Último Acceso</th>
                </tr>
              </thead>
              <tbody>
                {todosLosUsuarios.map((u, index) => {
                  const conectado = estaConectado(u.id);
                  const bgConectado = '#E8F5E9'; // Verde claro
                  const bgDesconectado = '#FFEBEE'; // Rojo claro
                  const bgBase = conectado ? bgConectado : bgDesconectado;

                  return (
                    <tr key={u.id} style={{
                      borderBottom: index < todosLosUsuarios.length - 1 ? '1px solid #E0E0E0' : 'none',
                      background: bgBase,
                      transition: 'background 0.2s'
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = conectado ? '#C8E6C9' : '#FFCDD2';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = bgBase;
                      }}
                    >
                      <td style={{
                        padding: '16px',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8
                        }}>
                          <div style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: conectado ? '#4CAF50' : '#F44336',
                            margin: '0 auto',
                            boxShadow: conectado ? '0 0 8px rgba(76, 175, 80, 0.5)' : '0 0 8px rgba(244, 67, 54, 0.5)'
                          }} title={conectado ? 'Conectado' : 'Desconectado'} />
                          <span style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: conectado ? '#4CAF50' : '#F44336'
                          }}>
                            {conectado ? 'En línea' : 'Offline'}
                          </span>
                        </div>
                      </td>
                      <td style={{
                        padding: '16px',
                        color: '#003D82',
                        fontWeight: 600,
                        fontSize: 14
                      }}>
                        {u.nombre}
                      </td>
                      <td style={{
                        padding: '16px',
                        color: '#666666',
                        fontSize: 14
                      }}>
                        @{u.username}
                      </td>
                      <td style={{
                        padding: '16px',
                        fontSize: 13
                      }}>
                        <span style={{
                          background: u.rol === 'analista' ? '#E3F2FD' : '#F3E5F5',
                          color: u.rol === 'analista' ? '#1976D2' : '#7B1FA2',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontWeight: 600,
                          textTransform: 'capitalize'
                        }}>
                          {u.rol}
                        </span>
                      </td>
                      <td style={{
                        padding: '16px',
                        color: '#999999',
                        fontSize: 13
                      }}>
                        {formatearHora(u.ultimoAcceso)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#999999'
          }}>
            <p style={{ fontSize: 16, marginBottom: 8 }}>No hay operadores ni analistas creados</p>
            <p style={{ fontSize: 13 }}>Los usuarios aparecerán aquí cuando se creen</p>
          </div>
        )}
      </main>
    </div>
  );
}
