import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useAuth } from '../contexts/AuthContext';
import type { Paciente } from '../services/patientsService';

interface FichaPacienteProps {
  paciente: Paciente;
  onClose: () => void;
  onActualizar?: (pacienteActualizado: Paciente) => void;
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function calcularPuntaje(p: Paciente): number | null {
  const b = p.barthel3 ?? p.barthel2 ?? p.barthel1;
  const pf = p.pfeiffer3 ?? p.pfeiffer2 ?? p.pfeiffer1;
  const l = p.lawton3 ?? p.lawton2 ?? p.lawton1;
  const tug = p.tug3 ?? p.tug2 ?? p.tug1;
  const m = p.mini3 ?? p.mini2 ?? p.mini1;
  const y = p.yesa3 ?? p.yesa2 ?? p.yesa1;
  if (b == null && pf == null && l == null) return null;
  let score = 0, total = 0;
  if (b != null)   { score += (b / 100) * 30;  total += 30; }
  if (pf != null)  { score += ((10 - pf) / 10) * 25; total += 25; }
  if (l != null)   { score += (l / 8) * 20;    total += 20; }
  if (tug != null) { score += Math.max(0, (60 - tug) / 60) * 10; total += 10; }
  if (m != null)   { score += (m / 30) * 10;   total += 10; }
  if (y != null)   { score += ((15 - y) / 15) * 5; total += 5; }
  return total > 0 ? Math.round((score / total) * 100) : null;
}

function semaforo(sc: number | null) {
  if (sc === null) return { color: '#999', label: 'Sin datos', emoji: '⚪', bg: '#f3f4f6' };
  if (sc >= 70)   return { color: '#16a34a', label: 'BIEN',    emoji: '🟢', bg: '#dcfce7' };
  if (sc >= 50)   return { color: '#ea8c55', label: 'REGULAR', emoji: '🟡', bg: '#fef3c7' };
  return             { color: '#dc2626', label: 'CRÍTICO', emoji: '🔴', bg: '#fef2f2' };
}

function getUltimaEval(p: Paciente) {
  return {
    barthel:  p.barthel3  ?? p.barthel2  ?? p.barthel1,
    pfeiffer: p.pfeiffer3 ?? p.pfeiffer2 ?? p.pfeiffer1,
    lawton:   p.lawton3   ?? p.lawton2   ?? p.lawton1,
    tug:      p.tug3      ?? p.tug2      ?? p.tug1,
    mini:     p.mini3     ?? p.mini2     ?? p.mini1,
    yesa:     p.yesa3     ?? p.yesa2     ?? p.yesa1,
  };
}

function calcularPrecauciones(p: Paciente): string[] {
  const ev = getUltimaEval(p);
  const lista: string[] = [];
  if (ev.barthel != null && ev.barthel < 40)  lista.push('🔴 Dependencia total (Barthel < 40). Requiere asistencia completa.');
  if (ev.barthel != null && ev.barthel >= 40 && ev.barthel < 60) lista.push('🟡 Dependencia moderada (Barthel 40–60). Requiere supervisión.');
  if (ev.tug     != null && ev.tug > 15)       lista.push('🔴 Alto riesgo de caídas (TUG > 15 s). Implementar medidas de seguridad.');
  if (ev.pfeiffer != null && ev.pfeiffer > 8)  lista.push('🟡 Posible deterioro cognitivo (Pfeiffer > 8). Monitorear atención.');
  if (ev.yesa    != null && ev.yesa > 5)       lista.push('🔴 Síntomas depresivos moderados a severos (Yesavage > 5). Derivar a salud mental.');
  if (ev.lawton  != null && ev.lawton < 3)     lista.push('🟡 Limitación en actividades instrumentales (Lawton < 3). Aumentar apoyo.');
  return lista;
}

function calcularRecomendaciones(p: Paciente): string[] {
  const ev = getUltimaEval(p);
  const lista: string[] = [];
  if (ev.barthel  != null && ev.barthel >= 60)  lista.push('✓ Mantener autonomía actual con ejercicios de fortalecimiento.');
  if (ev.tug      != null && ev.tug > 12)       lista.push('→ Iniciar programa de equilibrio y prevención de caídas.');
  if (ev.pfeiffer != null && ev.pfeiffer <= 8)  lista.push('✓ Función cognitiva preservada. Mantener actividades de estimulación.');
  if (ev.lawton   != null && ev.lawton >= 6)    lista.push('✓ Independencia en AIVD. Fomentar independencia.');
  if (ev.yesa     != null && ev.yesa <= 5)      lista.push('✓ Estado anímico favorable. Mantener actividades sociales.');
  if (ev.barthel  != null && ev.barthel < 60)   lista.push('→ Fisioterapia para mejorar movilidad y autonomía.');
  if (ev.lawton   != null && ev.lawton < 5)     lista.push('→ Entrenamiento en AIVD o apoyo comunitario.');
  return lista;
}

// ── Subcomponentes internos ──────────────────────────────────────────────────

function Campo({ label, valor }: { label: string; valor?: string | number | null }) {
  return (
    <div>
      <span style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
      <div style={{ fontSize: 13, color: '#222', marginTop: 2 }}>{valor || '—'}</div>
    </div>
  );
}

function FilaInstrumento({ nombre, v1, v2, v3, max, invertido }: {
  nombre: string; v1?: number; v2?: number; v3?: number; max: number; invertido?: boolean;
}) {
  const val = v3 ?? v2 ?? v1;
  if (val == null) return null;
  const pct = Math.min(100, Math.round((invertido ? (max - val) / max : val / max) * 100));
  const color = pct >= 70 ? '#16a34a' : pct >= 40 ? '#ea8c55' : '#dc2626';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
      <span style={{ width: 90, fontWeight: 600, color: '#444', flexShrink: 0 }}>{nombre}</span>
      {v1 != null ? <span style={{ width: 32, textAlign: 'right', color: '#aaa' }}>{v1}</span> : <span style={{ width: 32 }} />}
      <span style={{ color: '#ccc', fontSize: 11 }}>→</span>
      {v2 != null ? <span style={{ width: 32, textAlign: 'right', color: '#aaa' }}>{v2}</span> : <span style={{ width: 32 }} />}
      {(v2 != null || v3 != null) && <span style={{ color: '#ccc', fontSize: 11 }}>→</span>}
      <span style={{ width: 32, textAlign: 'right', fontWeight: 700, color }}>{val}</span>
      <div style={{ flex: 1, background: '#e5e7eb', borderRadius: 4, height: 8, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4 }} />
      </div>
      <span style={{ width: 30, fontSize: 11, color, fontWeight: 600 }}>{pct}%</span>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────

export function FichaPaciente({ paciente: p, onClose, onActualizar }: FichaPacienteProps) {
  const fichaRef = useRef<HTMLDivElement>(null);
  const { token } = useAuth();
  const [editandoVGI, setEditandoVGI] = useState(false);
  const [guardandoVGI, setGuardandoVGI] = useState(false);
  const [vgiForm, setVgiForm] = useState({
    barthel1: p.barthel1 ?? '', pfeiffer1: p.pfeiffer1 ?? '', lawton1: p.lawton1 ?? '',
    tug1: p.tug1 ?? '', mini1: p.mini1 ?? '', yesa1: p.yesa1 ?? '',
    barthel2: p.barthel2 ?? '', pfeiffer2: p.pfeiffer2 ?? '', lawton2: p.lawton2 ?? '',
    tug2: p.tug2 ?? '', mini2: p.mini2 ?? '', yesa2: p.yesa2 ?? '',
    barthel3: p.barthel3 ?? '', pfeiffer3: p.pfeiffer3 ?? '', lawton3: p.lawton3 ?? '',
    tug3: p.tug3 ?? '', mini3: p.mini3 ?? '', yesa3: p.yesa3 ?? '',
  });

  const sc = calcularPuntaje(p);
  const sem = semaforo(sc);
  const precauciones = calcularPrecauciones(p);
  const recomendaciones = calcularRecomendaciones(p);
  const tieneVGI = p.barthel1 || p.pfeiffer1 || p.lawton1 || p.tug1 || p.mini1 || p.yesa1
                || p.barthel2 || p.pfeiffer2 || p.lawton2 || p.tug2 || p.mini2 || p.yesa2
                || p.barthel3 || p.pfeiffer3 || p.lawton3 || p.tug3 || p.mini3 || p.yesa3;

  const toN = (v: any) => v === '' || v === null || v === undefined ? undefined : Number(v);

  const guardarVGI = async () => {
    if (!token) return;
    setGuardandoVGI(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const payload: any = {};
      Object.entries(vgiForm).forEach(([k, v]) => {
        const n = toN(v);
        if (n !== undefined) payload[k] = n;
      });
      const res = await fetch(`${apiUrl}/pacientes/${p.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const actualizado = { ...p, ...payload };
        if (onActualizar) onActualizar(actualizado as Paciente);
        alert('✅ Datos VGI guardados correctamente. Cierra y vuelve a abrir la ficha para ver las recomendaciones actualizadas.');
        setEditandoVGI(false);
      } else {
        alert('Error al guardar los datos VGI');
      }
    } catch {
      alert('Error de conexión al guardar');
    } finally {
      setGuardandoVGI(false);
    }
  };

  const descargarPDF = () => {
    if (!fichaRef.current) return;
    html2pdf().set({
      margin: 8,
      filename: `Ficha_${p.nombre.replace(/\s+/g, '_')}_${p.rut}.pdf`,
      image: { type: 'jpeg', quality: 0.97 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(fichaRef.current).save();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.65)',
      zIndex: 1000,
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* ── Barra superior ── */}
      <div style={{
        background: '#0f5c2e', padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>
          📋 Ficha de Paciente — <span style={{ fontWeight: 400 }}>{p.nombre}</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setEditandoVGI(true)} style={btnStyle('#0f4c81')}>✏️ Editar VGI</button>
          <button onClick={descargarPDF} style={btnStyle('#28A745')}>⬇️ Descargar PDF</button>
          <button onClick={onClose} style={btnStyle('rgba(255,255,255,0.2)')}>← Volver</button>
        </div>
      </div>

      {/* ── Modal edición VGI ── */}
      {editandoVGI && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 6px 0', color: '#0f5c2e' }}>✏️ Editar datos VGI — {p.nombre}</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: 12, color: '#666' }}>Ingresa los valores de las evaluaciones. Deja vacío lo que no aplique.</p>

            {[
              { label: '1ª Evaluación (Inicial)', prefix: '1' },
              { label: '2ª Evaluación (6 meses)', prefix: '2' },
              { label: '3ª Evaluación (12 meses)', prefix: '3' },
            ].map(({ label, prefix }) => (
              <div key={prefix} style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#0f5c2e', marginBottom: 10, borderBottom: '1px solid #e5e7eb', paddingBottom: 6 }}>{label}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {[
                    { campo: `barthel${prefix}`,  label: 'Barthel (0-100)' },
                    { campo: `pfeiffer${prefix}`, label: 'Pfeiffer (0-10)' },
                    { campo: `lawton${prefix}`,   label: 'Lawton (0-8)' },
                    { campo: `tug${prefix}`,      label: 'TUG (segundos)' },
                    { campo: `mini${prefix}`,     label: 'Mini Mental (0-30)' },
                    { campo: `yesa${prefix}`,     label: 'Yesavage (0-15)' },
                  ].map(({ campo, label: lbl }) => (
                    <div key={campo}>
                      <div style={{ fontSize: 11, color: '#666', marginBottom: 3 }}>{lbl}</div>
                      <input
                        type="number"
                        value={(vgiForm as any)[campo]}
                        onChange={e => setVgiForm(f => ({ ...f, [campo]: e.target.value }))}
                        placeholder="—"
                        style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 13, boxSizing: 'border-box' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
              <button onClick={() => setEditandoVGI(false)} style={{ padding: '8px 18px', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb', cursor: 'pointer', fontWeight: 600 }}>Cancelar</button>
              <button onClick={guardarVGI} disabled={guardandoVGI} style={{ padding: '8px 18px', borderRadius: 6, border: 'none', background: '#0f5c2e', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                {guardandoVGI ? 'Guardando...' : '💾 Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Contenido scrolleable ── */}
      <div ref={fichaRef} style={{ flex: 1, overflowY: 'auto', padding: 24, background: '#f3f4f6' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* ── Fila superior: datos personales + estado ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 16 }}>

            {/* Datos personales */}
            <div style={card}>
              <h3 style={cardTitle}>👤 Datos Personales</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <Campo label="RUT"            valor={`${p.rut}-${p.dv}`} />
                <Campo label="Sexo"           valor={p.sexo} />
                <Campo label="Edad"           valor={p.edad ? `${p.edad} años` : undefined} />
                <Campo label="Teléfono"       valor={p.telefono} />
                <Campo label="Escolaridad"    valor={p.escolaridad} />
                <Campo label="Pueblo orig."   valor={p.pueblo} />
                <Campo label="Región"         valor={p.region} />
                <Campo label="Provincia"      valor={p.provincia} />
                <Campo label="Comuna"         valor={p.comuna} />
                <Campo label="Sector"         valor={p.sector} />
                <Campo label="Rural/Urbano"   valor={p.rural} />
                <Campo label="RSH"            valor={p.rsh} />
              </div>
            </div>

            {/* Estado general */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ ...card, textAlign: 'center', background: sem.bg }}>
                <div style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Estado General</div>
                <div style={{ fontSize: 48, fontWeight: 800, color: sem.color, lineHeight: 1 }}>
                  {sc !== null ? sc : '—'}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: sem.color, marginTop: 8 }}>
                  {sem.emoji} {sem.label}
                </div>
              </div>
              <div style={card}>
                <h3 style={cardTitle}>🏥 Atención</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Campo label="Dependencia"  valor={p.dependencia} />
                  <Campo label="F. Ingreso"   valor={p.f_ingreso} />
                  <Campo label="F. Egreso"    valor={p.f_egreso} />
                  <Campo label="Período"      valor={p.anio ? `${p.anio}${p.semestre ? ` – S${p.semestre}` : ''}` : undefined} />
                  <Campo label="Operador"     valor={p.creadoPorNombre || p.creadoPor} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Instrumentos VGI ── */}
          {tieneVGI && (
            <div style={card}>
              <h3 style={cardTitle}>📊 Instrumentos VGI</h3>
              <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>
                Eval. inicial → 6 meses → 12 meses &nbsp;|&nbsp; Barra = % respecto al máximo (mayor es mejor, excepto Pfeiffer/TUG/Yesavage)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <FilaInstrumento nombre="Barthel"     v1={p.barthel1}  v2={p.barthel2}  v3={p.barthel3}  max={100} />
                <FilaInstrumento nombre="Pfeiffer"    v1={p.pfeiffer1} v2={p.pfeiffer2} v3={p.pfeiffer3} max={10}  invertido />
                <FilaInstrumento nombre="Lawton"      v1={p.lawton1}   v2={p.lawton2}   v3={p.lawton3}   max={8} />
                <FilaInstrumento nombre="TUG (seg)"   v1={p.tug1}      v2={p.tug2}      v3={p.tug3}      max={60}  invertido />
                <FilaInstrumento nombre="Mini Mental" v1={p.mini1}     v2={p.mini2}     v3={p.mini3}     max={30} />
                <FilaInstrumento nombre="Yesavage"    v1={p.yesa1}     v2={p.yesa2}     v3={p.yesa3}     max={15}  invertido />
              </div>
            </div>
          )}

          {/* ── Seguimiento trimestral ── */}
          {(p.t1_punt || p.t2_punt || p.t3_punt || p.t4_punt) && (
            <div style={card}>
              <h3 style={cardTitle}>📅 Seguimiento Trimestral</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
                {([
                  { label: 'Trimestre 1', punt: p.t1_punt, barthel: p.t1_barthel, mini: p.t1_mini },
                  { label: 'Trimestre 2', punt: p.t2_punt, barthel: p.t2_barthel, mini: p.t2_mini },
                  { label: 'Trimestre 3', punt: p.t3_punt, barthel: p.t3_barthel, mini: p.t3_mini },
                  { label: 'Trimestre 4', punt: p.t4_punt, barthel: p.t4_barthel, mini: p.t4_mini },
                ] as const).map((t, i) => t.punt != null && (
                  <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: '#0f5c2e', marginBottom: 8 }}>{t.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: semaforo(t.punt).color }}>{t.punt}</div>
                    {t.barthel != null && <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>Barthel: {t.barthel}</div>}
                    {t.mini    != null && <div style={{ fontSize: 11, color: '#666' }}>Mini Mental: {t.mini}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Precauciones y Recomendaciones ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={card}>
              <h3 style={cardTitle}>⚠️ Precauciones</h3>
              {precauciones.length === 0 ? (
                <div style={{ background: '#dcfce7', borderLeft: '4px solid #16a34a', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#15803d' }}>
                  <strong>✓ Sin precauciones críticas</strong>
                  <div style={{ marginTop: 4, fontSize: 12 }}>Paciente presenta buena evolución.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {precauciones.map((txt, i) => (
                    <div key={i} style={{ background: '#fef2f2', borderLeft: '4px solid #dc2626', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#7f1d1d' }}>{txt}</div>
                  ))}
                </div>
              )}
            </div>
            <div style={card}>
              <h3 style={cardTitle}>💡 Recomendaciones</h3>
              {recomendaciones.length === 0 ? (
                <div style={{ background: '#e0f2fe', borderLeft: '4px solid #0284c7', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#0c4a6e' }}>
                  <strong>💡 Continuar monitoreo regular</strong>
                  <div style={{ marginTop: 4, fontSize: 12 }}>Complete los instrumentos VGI para obtener recomendaciones personalizadas.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {recomendaciones.map((txt, i) => (
                    <div key={i} style={{ background: '#dcfce7', borderLeft: '4px solid #16a34a', borderRadius: 6, padding: '8px 12px', fontSize: 12, color: '#15803d' }}>{txt}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Plan de seguimiento y Observaciones ── */}
          {(p.plan || p.notas) && (
            <div style={{ display: 'grid', gridTemplateColumns: p.plan && p.notas ? '1fr 1fr' : '1fr', gap: 16 }}>
              {p.plan && (
                <div style={card}>
                  <h3 style={cardTitle}>📋 Plan de seguimiento</h3>
                  <div style={{ background: '#e0f2fe', borderLeft: '4px solid #0284c7', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#0c4a6e', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                    {p.plan}
                  </div>
                </div>
              )}
              {p.notas && (
                <div style={card}>
                  <h3 style={cardTitle}>📝 Observaciones clínicas</h3>
                  <div style={{ background: '#f3e8ff', borderLeft: '4px solid #9333ea', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#3b0764', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                    {p.notas}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ── Estilos compartidos ──────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: '#fff', borderRadius: 10,
  padding: '18px 20px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
};

const cardTitle: React.CSSProperties = {
  margin: '0 0 14px 0', fontSize: 14, fontWeight: 700,
  color: '#0f5c2e', borderBottom: '1px solid #e5e7eb', paddingBottom: 8
};

function btnStyle(bg: string): React.CSSProperties {
  return {
    background: bg, color: '#fff', border: 'none',
    padding: '8px 16px', borderRadius: 6,
    cursor: 'pointer', fontSize: 13, fontWeight: 600
  };
}
