import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import type { Paciente } from '../services/patientsService';

interface FichaPacienteProps {
  paciente: Paciente;
  onClose: () => void;
}

export function FichaPaciente({ paciente, onClose }: FichaPacienteProps) {
  const fichaRef = useRef<HTMLDivElement>(null);

  const descargarPDF = () => {
    if (!fichaRef.current) return;

    const element = fichaRef.current;
    const opt = {
      margin: 0,
      filename: `Ficha_${paciente.nombre.replace(/\s+/g, '_')}_${paciente.rut}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000
    }}>
      {/* Header */}
      <div style={{
        background: '#0f5c2e',
        padding: '16px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#FFFFFF' }}>
          📋 Ficha de Paciente
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={descargarPDF}
            style={{
              background: '#28A745',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#218838';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#28A745';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            ⬇️ Descargar ficha
          </button>
          <button
            onClick={onClose}
            style={{
              background: '#FFFFFF',
              color: '#0f5c2e',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#E8F3FF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
            }}
          >
            ← Volver
          </button>
        </div>
      </div>

      {/* Contenedor principal */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: '#FAF7F2',
          borderRadius: '12px',
          padding: '30px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
        }}>
          {/* Tarjeta de Credencial */}
          <div
            ref={fichaRef}
            style={{
              background: 'linear-gradient(135deg, #0f5c2e 0%, #15803d 100%)',
              borderRadius: '12px',
              padding: '40px 30px',
              color: '#FFFFFF',
              marginBottom: '0px',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontFamily: "'Open Sans', sans-serif",
              pageBreakInside: 'avoid'
            }}>
            {/* Header */}
            <div style={{ marginBottom: '20px', textAlign: 'center', borderBottom: '2px solid rgba(255,255,255,0.3)', paddingBottom: '20px' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>
                🏥 FICHA DE PACIENTE
              </div>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>
                Centro de Cuidado de Adultos Mayores
              </div>
            </div>

            {/* Información Principal */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '15px', wordBreak: 'break-word' }}>
                {paciente.nombre}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '12px' }}>
                <div>
                  <div style={{ opacity: 0.8, fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase' }}>RUT</div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{paciente.rut}-{paciente.dv}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.8, fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase' }}>Edad</div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{paciente.edad || '—'} años</div>
                </div>
                <div>
                  <div style={{ opacity: 0.8, fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase' }}>Sexo</div>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{paciente.sexo || '—'}</div>
                </div>
                <div>
                  <div style={{ opacity: 0.8, fontSize: '10px', marginBottom: '4px', textTransform: 'uppercase' }}>Estado</div>
                  <div style={{ fontWeight: 600, fontSize: '13px', textTransform: 'uppercase' }}>
                    {paciente.estado === 'activo' ? '✓ Activo' : '✗ Inactivo'}
                  </div>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div style={{ marginBottom: '20px', borderTop: '1px solid rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingTop: '15px', paddingBottom: '15px' }}>
              <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase' }}>📍 Ubicación</div>
              <div style={{ fontSize: '12px' }}>
                {paciente.comuna}, {paciente.provincia}
                <br />
                {paciente.region}
              </div>
            </div>

            {/* Contacto */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '8px', textTransform: 'uppercase' }}>📞 Contacto</div>
              <div style={{ fontSize: '12px' }}>
                <div>Tel: {paciente.telefono || '—'}</div>
                <div>Email: {paciente.email || '—'}</div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', fontSize: '10px', opacity: 0.8, borderTop: '1px solid rgba(255,255,255,0.3)', paddingTop: '15px' }}>
              <div>Registro: {new Date(paciente.fecha_registro).toLocaleDateString('es-CL')}</div>
              <div style={{ marginTop: '8px' }}>Operador: {paciente.creadoPor}</div>
              <div style={{ marginTop: '8px' }}>ID: {paciente.id}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
