import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AdminUsuarios } from '../components/AdminUsuarios';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const { usuario } = useAuth();
  const [vista, setVista] = useState<'inicio' | 'usuarios'>('inicio');

  const handleLogout = async () => {
    await onLogout();
  };

  if (vista === 'usuarios') {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <nav style={{
          background: 'linear-gradient(135deg,#1a5c28,#2d7a3a)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 2px 12px rgba(0,0,0,.2)'
        }}>
          <button onClick={() => setVista('inicio')} style={{
            background: 'rgba(255,255,255,.15)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,.3)',
            padding: '6px 14px',
            borderRadius: '7px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}>← Inicio</button>
          <span style={{ color: '#fff', fontWeight: 600 }}>Gestión de Usuarios</span>
          <button onClick={handleLogout} style={{
            marginLeft: 'auto',
            background: 'rgba(255,255,255,.15)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,.3)',
            padding: '6px 14px',
            borderRadius: '7px',
            cursor: 'pointer',
            fontSize: '13px'
          }}>Cerrar sesión</button>
        </nav>
        <AdminUsuarios />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #FAF7F2 0%, #e8ede8 100%)',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg,#1a5c28,#2d7a3a 60%,#4aaa5a)',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: '0 4px 18px rgba(26,92,40,.35)'
      }}>
        <span style={{ fontSize: 28 }}>🏥</span>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>
            Centro de Gestión — Adultos Mayores
          </div>
          <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 11, marginTop: 2 }}>
            Centros Diurnos 2026
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'rgba(255,255,255,.85)', fontSize: 13 }}>
            Hola, <strong>{usuario?.nombre || usuario?.username}</strong>
          </span>
          <button onClick={handleLogout} style={{
            background: 'rgba(255,255,255,.15)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,.35)',
            padding: '7px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600
          }}>🚪 Cerrar sesión</button>
        </div>
      </header>

      {/* Contenido */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{
          fontSize: 22,
          fontWeight: 700,
          color: '#1a5c28',
          marginBottom: 8
        }}>¿Qué deseas hacer hoy?</h2>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>
          Selecciona una herramienta para comenzar.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {/* Línea Base */}
          <a href="/linea_base.html" style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#fff',
              borderRadius: 16,
              padding: '28px 24px',
              boxShadow: '0 2px 16px rgba(0,0,0,.08)',
              borderTop: '4px solid #8B6F47',
              cursor: 'pointer',
              transition: 'transform .18s, box-shadow .18s',
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,.13)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,.08)';
              }}
            >
              <div style={{ fontSize: 36 }}>📋</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#8B6F47' }}>
                Línea Base — Adultos Mayores
              </div>
              <div style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>
                Registro y seguimiento de la línea base de evaluación de adultos mayores.
              </div>
              <div style={{
                marginTop: 8,
                color: '#8B6F47',
                fontSize: 13,
                fontWeight: 600
              }}>Abrir →</div>
            </div>
          </a>

          {/* Admin usuarios (solo admin) */}
          {usuario?.rol === 'admin' && (
            <div
              onClick={() => setVista('usuarios')}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: '28px 24px',
                boxShadow: '0 2px 16px rgba(0,0,0,.08)',
                borderTop: '4px solid #2B5BA8',
                cursor: 'pointer',
                transition: 'transform .18s, box-shadow .18s',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,0,0,.13)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,.08)';
              }}
            >
              <div style={{ fontSize: 36 }}>👥</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#2B5BA8' }}>
                Gestión de Usuarios
              </div>
              <div style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>
                Crear, modificar y administrar usuarios del sistema. Solo para administradores.
              </div>
              <div style={{
                marginTop: 8,
                color: '#2B5BA8',
                fontSize: 13,
                fontWeight: 600
              }}>Abrir →</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
