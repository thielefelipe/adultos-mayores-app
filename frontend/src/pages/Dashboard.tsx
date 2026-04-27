import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AdminUsuarios } from '../components/AdminUsuarios';
import { GestorOperadores } from './GestorOperadores';
import { usuariosService, type Usuario } from '../services/usuariosService';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const { usuario, token } = useAuth();

  // Limpiar localStorage INMEDIATAMENTE al cargar el componente
  localStorage.removeItem('dashboardVista');

  // Siempre comenzar en 'inicio' al cargar el Dashboard
  const [vista, setVistaState] = useState<'inicio' | 'usuarios' | 'gestorOperadores'>('inicio');

  // Wrapper para setVista que también guarda en localStorage y en el historial del navegador
  const setVista = (nuevaVista: 'inicio' | 'usuarios' | 'gestorOperadores') => {
    localStorage.setItem('dashboardVista', nuevaVista);
    setVistaState(nuevaVista);
    // Actualizar la URL usando hash para que funcione con Render
    let hash = '';
    if (nuevaVista === 'usuarios') {
      hash = '#/admin/usuarios';
    } else if (nuevaVista === 'gestorOperadores') {
      hash = '#/admin/gestoroperadores';
    }
    window.location.hash = hash;
  };

  // Manejar el botón "Atrás" del navegador y cargar vista según la URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes('admin/usuarios')) {
        setVistaState('usuarios');
      } else if (hash.includes('admin/gestoroperadores')) {
        setVistaState('gestorOperadores');
      } else {
        setVistaState('inicio');
      }
    };

    // Detectar la vista inicial según la URL hash
    const currentHash = window.location.hash;
    if (currentHash.includes('admin/usuarios')) {
      setVistaState('usuarios');
    } else if (currentHash.includes('admin/gestoroperadores')) {
      setVistaState('gestorOperadores');
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const [usuariosActivos, setUsuariosActivos] = useState<Usuario[]>([]);

  useEffect(() => {
    if (!token || usuario?.rol !== 'admin') {
      return;
    }

    const cargarUsuariosActivos = async () => {
      try {
        const usuarios = await usuariosService.obtenerActivos(token);
        const filtrados = usuarios.filter(u => u.rol === 'operador' || u.rol === 'analista');
        setUsuariosActivos(filtrados);
      } catch (error) {
        console.error('Error al cargar usuarios activos:', error);
      }
    };

    // Enviar heartbeat inmediatamente
    usuariosService.enviarHeartbeat(token).catch(err => console.error('Error en heartbeat:', err));

    // Cargar usuarios activos
    cargarUsuariosActivos();

    // Enviar heartbeat cada 30 segundos
    const heartbeatInterval = setInterval(() => {
      usuariosService.enviarHeartbeat(token).catch(err => console.error('Error en heartbeat:', err));
    }, 30000);

    // Recargar usuarios activos cada 10 segundos
    const reloadInterval = setInterval(() => {
      cargarUsuariosActivos();
    }, 10000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(reloadInterval);
    };
  }, [token, usuario?.rol]);

  const handleLogout = async () => {
    await onLogout();
  };


  if (vista === 'gestorOperadores') {
    return (
      <GestorOperadores
        onVolver={() => setVista('inicio')}
        onLogout={handleLogout}
      />
    );
  }

  if (vista === 'usuarios') {
    return (
      <div style={{ minHeight: '100vh', background: '#FAF7F2' }}>
        <nav style={{
          background: '#003D82',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
        }}>
          <button onClick={() => setVista('inicio')} style={{
            background: 'rgba(255,255,255,.15)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,.3)',
            padding: '6px 14px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}>← Inicio</button>
          <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Gestión de Usuarios</span>
          <button onClick={handleLogout} style={{
            marginLeft: 'auto',
            background: '#0066CC',
            color: '#FFFFFF',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}>Cerrar sesión</button>
        </nav>
        <AdminUsuarios />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAF7F2',
      fontFamily: "'Open Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column'
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
        <span style={{ fontSize: 28 }}>MC</span>
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 17 }}>
            Dashboard RRHH
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#FFFFFF', fontSize: 13 }}>
            Hola, <strong>{usuario?.nombre || usuario?.username}</strong>
          </span>
          <button onClick={handleLogout} style={{
            background: '#0066CC',
            color: '#FFFFFF',
            border: 'none',
            padding: '7px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600
          }}>Cerrar sesión</button>
        </div>
      </header>

      {/* Contenido */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 40px 24px', width: '100%' }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#003D82',
          marginBottom: 8,
          fontFamily: "'Montserrat', sans-serif"
        }}>Bienvenido al Sistema</h2>
        <p style={{ color: '#666666', fontSize: 14, marginBottom: 40 }}>
          Sistema de Gestión de Recursos Humanos
        </p>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECCIÓN 1: INGRESO DE DATOS */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 50 }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#003D82',
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: '2px solid #0066CC'
          }}>
            Ingreso de Datos
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {/* Card: Ingreso de Pacientes */}
            <a href="/ingreso_pacientes.html" style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#FFFFFF',
                borderRadius: 8,
                padding: '24px',
                border: '2px solid #0066CC',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'transform .18s, box-shadow .18s',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 12px rgba(0, 102, 204, 0.15)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0px 2px 8px rgba(0,0,0,0.05)';
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#003D82', marginBottom: 16 }}>
                    Ingreso de Pacientes
                  </div>
                  <div style={{ color: '#666666', fontSize: 14, lineHeight: 1.5 }}>
                    Registra nuevos pacientes con todos sus datos personales y de salud.
                  </div>
                </div>
                <div style={{
                  marginTop: 16,
                  color: '#0066CC',
                  fontSize: 13,
                  fontWeight: 600
                }}>Abrir →</div>
              </div>
            </a>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECCIÓN 2: INFORMACIÓN Y ESTADÍSTICAS */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div>
          <h3 style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#003D82',
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: '2px solid #E0E0E0'
          }}>
            Información y Estadísticas
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {/* Card: Usuarios Activos */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: 8,
            padding: '24px',
            border: '1px solid #E0E0E0',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
            transition: 'transform .18s, box-shadow .18s',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 2px 8px rgba(0,0,0,0.05)';
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#003D82', marginBottom: 16 }}>
                Usuarios Activos
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#0066CC', marginBottom: 16 }}>
                {usuariosActivos.length}
              </div>
              <div style={{ color: '#999999', fontSize: 12, marginBottom: 20 }}>
                Activos en este momento
              </div>
            </div>
            <button
              onClick={() => setVista('gestorOperadores')}
              style={{
                background: '#0066CC',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                width: '100%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0052A3';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0066CC';
              }}
            >
              Ver todos →
            </button>
          </div>

          {/* Card: Ingresar Usuarios */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: 8,
            padding: '24px',
            border: '2px solid #0066CC',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            transition: 'transform .18s, box-shadow .18s',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 12px rgba(0, 102, 204, 0.15)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 2px 8px rgba(0,0,0,0.05)';
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#003D82', marginBottom: 16 }}>
                Ingresar Usuarios
              </div>
              <div style={{ color: '#666666', fontSize: 14, lineHeight: 1.5 }}>
                Crea nuevos operadores y analistas en el sistema.
              </div>
            </div>
            <button
              onClick={() => setVista('usuarios')}
              style={{
                marginTop: 16,
                background: '#0066CC',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                width: '100%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0052A3';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0066CC';
              }}
            >
              Crear Usuario →
            </button>
          </div>

          {/* Card: Gestión de Usuarios */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: 8,
            padding: '24px',
            border: '2px solid #0066CC',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            transition: 'transform .18s, box-shadow .18s',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 12px rgba(0, 102, 204, 0.15)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 2px 8px rgba(0,0,0,0.05)';
            }}
          >
            <div>
              <div style={{ fontSize: 36, marginBottom: 16, color: '#0066CC' }}>
                👤
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#003D82', marginBottom: 16 }}>
                Gestión de Usuarios
              </div>
              <div style={{ color: '#666666', fontSize: 14, lineHeight: 1.5 }}>
                Administra operadores, analistas y usuarios del sistema.
              </div>
            </div>
            <button
              onClick={() => setVista('usuarios')}
              style={{
                marginTop: 16,
                background: '#0066CC',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                width: '100%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0052A3';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0066CC';
              }}
            >
              Acceder →
            </button>
          </div>

          {/* Card: Reportes */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: 8,
            padding: '24px',
            border: '1px solid #E0E0E0',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            transition: 'transform .18s, box-shadow .18s',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 2px 8px rgba(0,0,0,0.05)';
            }}
          >
            <div>
              <div style={{ fontSize: 36, marginBottom: 16, color: '#0066CC' }}>
                📊
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#003D82', marginBottom: 16 }}>
                Reportes
              </div>
              <div style={{ color: '#666666', fontSize: 14, lineHeight: 1.5 }}>
                Genera y descarga reportes de pacientes y actividades.
              </div>
            </div>
            <button
              style={{
                marginTop: 16,
                background: '#0066CC',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                width: '100%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0052A3';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0066CC';
              }}
            >
              Ver Reportes →
            </button>
          </div>

          {/* Card: Análisis */}
          <div style={{
            background: '#FFFFFF',
            borderRadius: 8,
            padding: '24px',
            border: '1px solid #E0E0E0',
            boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
            cursor: 'pointer',
            transition: 'transform .18s, box-shadow .18s',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0px 2px 8px rgba(0,0,0,0.05)';
            }}
          >
            <div>
              <div style={{ fontSize: 36, marginBottom: 16, color: '#0066CC' }}>
                📈
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: '#003D82', marginBottom: 16 }}>
                Análisis de Datos
              </div>
              <div style={{ color: '#666666', fontSize: 14, lineHeight: 1.5 }}>
                Analiza estadísticas y tendencias del sistema.
              </div>
            </div>
            <button
              style={{
                marginTop: 16,
                background: '#0066CC',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                width: '100%',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0052A3';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#0066CC';
              }}
            >
              Ver Análisis →
            </button>
          </div>

          </div>
        </div>

      </main>
    </div>
  );
}
