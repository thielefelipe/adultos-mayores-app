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
      <div style={{ minHeight: '100vh', background: 'var(--cream)' }}>
        <nav style={{
          background: 'var(--deep)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow)'
        }}>
          <button onClick={() => setVista('inicio')} style={{
            background: 'rgba(255,255,255,.15)',
            color: 'var(--cream)',
            border: '1px solid rgba(255,255,255,.3)',
            padding: '6px 14px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600
          }}>← Inicio</button>
          <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Gestión de Usuarios</span>
          <button onClick={handleLogout} style={{
            marginLeft: 'auto',
            background: 'var(--clay)',
            color: 'var(--deep)',
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
      background: 'linear-gradient(160deg, var(--cream) 0%, var(--warm) 100%)',
      fontFamily: "var(--sans)"
    }}>
      {/* Header */}
      <header style={{
        background: 'var(--deep)',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <span style={{ fontSize: 28 }}>🏥</span>
        <div>
          <div style={{ color: 'var(--cream)', fontWeight: 700, fontSize: 17 }}>
            Centro de Gestión — Adultos Mayores
          </div>
          <div style={{ color: 'rgba(250,247,242,.7)', fontSize: 11, marginTop: 2 }}>
            Centros Diurnos 2025
          </div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'rgba(250,247,242,.85)', fontSize: 13 }}>
            Hola, <strong>{usuario?.nombre || usuario?.username}</strong>
          </span>
          <button onClick={handleLogout} style={{
            background: 'var(--clay)',
            color: 'var(--deep)',
            border: 'none',
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
          color: 'var(--deep)',
          marginBottom: 8,
          fontFamily: "var(--heading)"
        }}>¿Qué deseas hacer hoy?</h2>
        <p style={{ color: 'var(--terra)', fontSize: 14, marginBottom: 32 }}>
          Selecciona una herramienta para comenzar.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {/* Línea Base */}
          <a href="/linea_base.html" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white',
              borderRadius: 14,
              padding: '28px 24px',
              boxShadow: 'var(--shadow)',
              borderTop: '4px solid var(--terra)',
              cursor: 'pointer',
              transition: 'transform .18s, box-shadow .18s',
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow)';
              }}
            >
              <div style={{ fontSize: 36 }}>📋</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--terra)' }}>
                Línea Base — Adultos Mayores
              </div>
              <div style={{ color: 'var(--terra)', fontSize: 13, lineHeight: 1.5 }}>
                Registro y seguimiento de la línea base de evaluación de adultos mayores.
              </div>
              <div style={{
                marginTop: 8,
                color: 'var(--terra)',
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
                background: 'white',
                borderRadius: 14,
                padding: '28px 24px',
                boxShadow: 'var(--shadow)',
                borderTop: '4px solid var(--azul)',
                cursor: 'pointer',
                transition: 'transform .18s, box-shadow .18s',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow)';
              }}
            >
              <div style={{ fontSize: 36 }}>👥</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--azul)' }}>
                Gestión de Usuarios
              </div>
              <div style={{ color: 'var(--terra)', fontSize: 13, lineHeight: 1.5 }}>
                Crear, modificar y administrar usuarios del sistema. Solo para administradores.
              </div>
              <div style={{
                marginTop: 8,
                color: 'var(--azul)',
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
