import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import type { Paciente } from '../services/patientsService';

// Usa la evaluación más reciente disponible (eval2 si existe, si no eval1)
function getUltimaEval(p: Paciente) {
  return {
    barthel:  p.barthel2  ?? p.barthel1,
    pfeiffer: p.pfeiffer2 ?? p.pfeiffer1,
    lawton:   p.lawton2   ?? p.lawton1,
    tug:      p.tug2      ?? p.tug1,
    mini:     p.mini2     ?? p.mini1,
    yesa:     p.yesa2     ?? p.yesa1,
    eq:       p.eq2       ?? p.eq1,
  };
}

function calcularPrecauciones(p: Paciente) {
  const ev = getUltimaEval(p);
  const lista: string[] = [];
  if (ev.barthel != null && ev.barthel < 40)
    lista.push('🔴 Dependencia total (Barthel < 40). Requiere asistencia completa.');
  if (ev.barthel != null && ev.barthel >= 40 && ev.barthel < 60)
    lista.push('🟡 Dependencia moderada (Barthel 40–60). Requiere supervisión.');
  if (ev.tug != null && ev.tug > 15)
    lista.push('🔴 Alto riesgo de caídas (TUG > 15 s). Implementar medidas de seguridad.');
  if (ev.pfeiffer != null && ev.pfeiffer > 8)
    lista.push('🟡 Posible deterioro cognitivo (Pfeiffer > 8). Monitorear atención.');
  if (ev.yesa != null && ev.yesa > 5)
    lista.push('🔴 Síntomas depresivos moderados a severos (Yesavage > 5). Derivar a salud mental.');
  if (ev.lawton != null && ev.lawton < 3)
    lista.push('🟡 Limitación en actividades instrumentales (Lawton < 3). Aumentar apoyo.');
  return lista;
}

function calcularRecomendaciones(p: Paciente) {
  const ev = getUltimaEval(p);
  const lista: string[] = [];
  if (ev.barthel != null && ev.barthel >= 60)
    lista.push('✓ Mantener autonomía actual con ejercicios de fortalecimiento.');
  if (ev.tug != null && ev.tug > 12)
    lista.push('→ Iniciar programa de equilibrio y prevención de caídas.');
  if (ev.pfeiffer != null && ev.pfeiffer <= 8)
    lista.push('✓ Función cognitiva preservada. Mantener actividades de estimulación.');
  if (ev.lawton != null && ev.lawton >= 6)
    lista.push('✓ Independencia en AIVD. Fomentar independencia.');
  if (ev.yesa != null && ev.yesa <= 5)
    lista.push('✓ Estado anímico favorable. Mantener actividades sociales.');
  if (ev.barthel != null && ev.barthel < 60)
    lista.push('→ Fisioterapia para mejorar movilidad y autonomía.');
  if (ev.lawton != null && ev.lawton < 5)
    lista.push('→ Entrenamiento en AIVD o apoyo comunitario.');
  return lista;
}

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

          {/* Precauciones automáticas basadas en VGI */}
          {(() => {
            const precauciones = calcularPrecauciones(paciente);
            if (precauciones.length === 0) return (
              <div style={{ marginTop: '16px', background: '#dcfce7', borderLeft: '4px solid #16a34a', borderRadius: '8px', padding: '12px 16px' }}>
                <strong style={{ color: '#16a34a', fontSize: '13px' }}>✓ Sin precauciones críticas</strong>
                <p style={{ margin: '4px 0 0 0', color: '#555', fontSize: '12px' }}>Paciente presenta buena evolución.</p>
              </div>
            );
            return (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#dc2626', marginBottom: '8px' }}>⚠️ Precauciones</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {precauciones.map((p, i) => (
                    <div key={i} style={{ background: '#fef2f2', borderLeft: '4px solid #dc2626', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', color: '#7f1d1d' }}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Recomendaciones automáticas basadas en VGI */}
          {(() => {
            const recomendaciones = calcularRecomendaciones(paciente);
            if (recomendaciones.length === 0) return null;
            return (
              <div style={{ marginTop: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: '13px', color: '#15803d', marginBottom: '8px' }}>💡 Recomendaciones</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {recomendaciones.map((r, i) => (
                    <div key={i} style={{ background: '#dcfce7', borderLeft: '4px solid #16a34a', borderRadius: '6px', padding: '8px 12px', fontSize: '12px', color: '#15803d' }}>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Plan de seguimiento ingresado por el operador */}
          {paciente.plan && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#0369a1', marginBottom: '8px' }}>📋 Plan de seguimiento</div>
              <div style={{ background: '#e0f2fe', borderLeft: '4px solid #0284c7', borderRadius: '6px', padding: '10px 14px', fontSize: '12px', color: '#0c4a6e', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {paciente.plan}
              </div>
            </div>
          )}

          {/* Observaciones clínicas del operador */}
          {paciente.notas && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontWeight: 700, fontSize: '13px', color: '#6b21a8', marginBottom: '8px' }}>📝 Observaciones clínicas</div>
              <div style={{ background: '#f3e8ff', borderLeft: '4px solid #9333ea', borderRadius: '6px', padding: '10px 14px', fontSize: '12px', color: '#3b0764', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {paciente.notas}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
