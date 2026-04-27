import { useAuth } from '../contexts/AuthContext';

interface AnalystDashboardProps {
  onLogout: () => void;
}

export function AnalystDashboard({ onLogout }: AnalystDashboardProps) {
  const { usuario } = useAuth();

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <div style={{
      flex: 1,
      width: '100%',
      background: '#FAF7F2',
      fontFamily: "'Open Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
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
        <span style={{ fontSize: 28, color: '#FFFFFF' }}>MC</span>
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 17 }}>
            Portal de Analistas
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
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#003D82',
          marginBottom: 8,
          fontFamily: "'Montserrat', sans-serif"
        }}>Bienvenido, {usuario?.nombre}</h2>
        <p style={{ color: '#666666', fontSize: 14, marginBottom: 40 }}>
          Portal de análisis y gestión de pacientes
        </p>

        {/* Módulos disponibles para analistas */}
        <div style={{ marginBottom: 50 }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#003D82',
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: '2px solid #0066CC'
          }}>
            Módulos Disponibles
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

            {/* Card: Descargar Reportes */}
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
                <div style={{ fontWeight: 700, fontSize: 18, color: '#003D82', marginBottom: 16 }}>
                  Descargar Reportes
                </div>
                <div style={{ color: '#666666', fontSize: 14, lineHeight: 1.5 }}>
                  Descarga reportes en Excel, PDF y otros formatos para análisis.
                </div>
              </div>
              <div style={{
                marginTop: 16,
                color: '#0066CC',
                fontSize: 13,
                fontWeight: 600
              }}>Próximamente</div>
            </div>

            {/* Card: Análisis de Datos */}
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
                <div style={{ fontWeight: 700, fontSize: 18, color: '#003D82', marginBottom: 16 }}>
                  Análisis de Datos
                </div>
                <div style={{ color: '#666666', fontSize: 14, lineHeight: 1.5 }}>
                  Visualiza gráficos, estadísticas y tendencias de pacientes.
                </div>
              </div>
              <div style={{
                marginTop: 16,
                color: '#0066CC',
                fontSize: 13,
                fontWeight: 600
              }}>Próximamente</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
