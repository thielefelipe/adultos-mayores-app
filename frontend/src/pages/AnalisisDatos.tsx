import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { patientsService, type Paciente } from '../services/patientsService';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const pieLabel = ({ name, percent }: { name?: string; percent?: number }) =>
  `${name ?? ''} ${Math.round((percent ?? 0) * 100)}%`;

const pieLabelShort = ({ name, percent }: { name?: string; percent?: number }) => {
  const n = name ?? '';
  return `${n.length > 14 ? n.slice(0, 14) + '…' : n} ${Math.round((percent ?? 0) * 100)}%`;
};

interface AnalisisDatosProps {
  onBack: () => void;
  esAdmin: boolean;
}

type Tab = 'kpis' | 'vgi' | 'trimestral' | 'temporal' | 'sociodemografico' | 'operador';

const VERDE_COLORS = ['#15803d', '#22c55e', '#4ade80', '#86efac', '#0f5c2e', '#166534'];

const avg = (nums: number[]): number => {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

const round1 = (n: number) => Math.round(n * 10) / 10;

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: 10,
      padding: '20px 24px',
      border: '1px solid #E0E0E0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    }}>
      <div style={{ color: '#666', fontSize: 13, fontWeight: 600 }}>{label}</div>
      <div style={{ color: '#0f5c2e', fontSize: 32, fontWeight: 700 }}>{value}</div>
      {sub && <div style={{ color: '#999', fontSize: 12 }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{
      fontSize: 18,
      fontWeight: 700,
      color: '#0f5c2e',
      marginBottom: 20,
      paddingBottom: 10,
      borderBottom: '2px solid #15803d',
    }}>{children}</h3>
  );
}

function NoData({ msg }: { msg?: string }) {
  return (
    <div style={{
      textAlign: 'center',
      color: '#999',
      padding: '32px 0',
      fontSize: 14,
      background: '#FAF7F2',
      borderRadius: 8,
      border: '1px dashed #CCC',
    }}>
      {msg || 'No hay datos suficientes para este análisis.'}
    </div>
  );
}

// ─── VGI helpers ─────────────────────────────────────────────────────────────

type VgiKey = 'barthel' | 'pfeiffer' | 'lawton' | 'tug' | 'mini' | 'yesa';

const VGI_META: { key: VgiKey; label: string; descripcion: string; mayorEsMejor: boolean }[] = [
  { key: 'barthel',  label: 'Barthel',       descripcion: 'Independencia funcional (0-100)', mayorEsMejor: true },
  { key: 'pfeiffer', label: 'Pfeiffer',       descripcion: 'Deterioro cognitivo (0-10, mayor=peor)', mayorEsMejor: false },
  { key: 'lawton',   label: 'Lawton',         descripcion: 'Actividades instrumentales (0-8)', mayorEsMejor: true },
  { key: 'tug',      label: 'TUG',            descripcion: 'Riesgo de caídas en segundos (menor=mejor)', mayorEsMejor: false },
  { key: 'mini',     label: 'Mini-Mental',    descripcion: 'Cognición (0-35)', mayorEsMejor: true },
  { key: 'yesa',     label: 'YESA',           descripcion: 'Depresión (0-15, mayor=peor)', mayorEsMejor: false },
];

function vgiValues(pacientes: Paciente[], key: VgiKey, eval1: boolean): number[] {
  return pacientes
    .map(p => eval1 ? p[`${key}1` as keyof Paciente] : p[`${key}2` as keyof Paciente])
    .filter((v): v is number => v != null && !isNaN(Number(v)))
    .map(Number);
}

function vgiTrend(pacientes: Paciente[], key: VgiKey, mayorEsMejor: boolean) {
  const both = pacientes.filter(p =>
    p[`${key}1` as keyof Paciente] != null &&
    p[`${key}2` as keyof Paciente] != null
  );
  let mejoraron = 0, empeoraron = 0, estables = 0;
  both.forEach(p => {
    const v1 = Number(p[`${key}1` as keyof Paciente]);
    const v2 = Number(p[`${key}2` as keyof Paciente]);
    if (v2 === v1) estables++;
    else if (mayorEsMejor ? v2 > v1 : v2 < v1) mejoraron++;
    else empeoraron++;
  });
  return { mejoraron, empeoraron, estables, total: both.length };
}

// ─── SECCIÓN KPIs ─────────────────────────────────────────────────────────────

function SeccionKPIs({ pacientes }: { pacientes: Paciente[] }) {
  const activos = pacientes.filter(p => p.estado === 'activo').length;
  const altaCount = pacientes.filter(p => p.estado === 'dado_de_alta').length;
  const pendientes = pacientes.filter(p => p.estado === 'pendiente_eliminacion').length;

  const edades = pacientes.map(p => p.edad).filter((e): e is number => e != null);
  const promedioEdad = edades.length ? round1(avg(edades)) : '-';

  const rurales = pacientes.filter(p => p.rural && p.rural.toLowerCase() === 'sí').length;
  const pctRurales = pacientes.length ? Math.round((rurales / pacientes.length) * 100) : 0;

  const conRsh = pacientes.filter(p => p.rsh && p.rsh.trim() !== '' && p.rsh.toLowerCase() !== 'no').length;
  const pctRsh = pacientes.length ? Math.round((conRsh / pacientes.length) * 100) : 0;

  // Sexo
  const sexoMap: Record<string, number> = {};
  pacientes.forEach(p => {
    if (p.sexo) {
      const s = p.sexo.trim();
      sexoMap[s] = (sexoMap[s] || 0) + 1;
    }
  });
  const sexoData = Object.entries(sexoMap).map(([name, value]) => ({ name, value }));

  // Grupos etarios
  const grupos = [
    { label: '60-69', min: 60, max: 69 },
    { label: '70-79', min: 70, max: 79 },
    { label: '80-89', min: 80, max: 89 },
    { label: '90+',   min: 90, max: 200 },
  ];
  const etarioData = grupos.map(g => ({
    name: g.label,
    cantidad: edades.filter(e => e >= g.min && e <= g.max).length,
  }));

  return (
    <div>
      <SectionTitle>Indicadores Clave</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
        <StatCard label="Pacientes Activos" value={activos} />
        <StatCard label="Dados de Alta" value={altaCount} />
        <StatCard label="Pendientes" value={pendientes} />
        <StatCard label="Promedio de Edad" value={promedioEdad} sub={`sobre ${edades.length} pacientes con edad registrada`} />
        <StatCard label="% Rurales" value={`${pctRurales}%`} sub={`${rurales} de ${pacientes.length}`} />
        <StatCard label="% con RSH" value={`${pctRsh}%`} sub={`${conRsh} de ${pacientes.length}`} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
        {/* Distribución por sexo */}
        <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
          <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Distribución por Sexo</div>
          {sexoData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={sexoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={pieLabel}>
                  {sexoData.map((_, i) => <Cell key={i} fill={VERDE_COLORS[i % VERDE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </div>

        {/* Grupos etarios */}
        <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
          <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Distribución por Grupos Etarios</div>
          {edades.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={etarioData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="cantidad" name="Pacientes" fill="#15803d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </div>
      </div>
    </div>
  );
}

// ─── SECCIÓN VGI ──────────────────────────────────────────────────────────────

function SeccionVGI({ pacientes }: { pacientes: Paciente[] }) {
  return (
    <div>
      <SectionTitle>Instrumentos de Evaluación VGI</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {VGI_META.map(({ key, label, descripcion, mayorEsMejor }) => {
          const v1 = vgiValues(pacientes, key, true);
          const v2 = vgiValues(pacientes, key, false);
          const avg1 = v1.length ? round1(avg(v1)) : null;
          const avg2 = v2.length ? round1(avg(v2)) : null;
          const trend = vgiTrend(pacientes, key, mayorEsMejor);

          const barData = [
            ...(avg1 != null ? [{ name: '1ª Evaluación', valor: avg1 }] : []),
            ...(avg2 != null ? [{ name: '2ª Evaluación', valor: avg2 }] : []),
          ];

          return (
            <div key={key} style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f5c2e', fontSize: 16 }}>{label}</div>
                  <div style={{ color: '#888', fontSize: 12 }}>{descripcion}</div>
                </div>
                {trend.total > 0 && (
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      Mejoraron: {trend.mejoraron}
                    </span>
                    <span style={{ background: '#fee2e2', color: '#991b1b', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      Empeoraron: {trend.empeoraron}
                    </span>
                    <span style={{ background: '#f3f4f6', color: '#374151', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                      Estables: {trend.estables}
                    </span>
                  </div>
                )}
              </div>
              {barData.length > 0 ? (
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 40, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => [v, 'Promedio']} />
                    <Bar dataKey="valor" name="Promedio" radius={[0, 4, 4, 0]}>
                      {barData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? '#15803d' : '#22c55e'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <NoData msg={`Sin datos de ${label} registrados.`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SECCIÓN TRIMESTRAL ───────────────────────────────────────────────────────

function SeccionTrimestral({ pacientes }: { pacientes: Paciente[] }) {
  const trimestres = [
    { label: 'T1', barthel: 't1_barthel', mini: 't1_mini', punt: 't1_punt' },
    { label: 'T2', barthel: 't2_barthel', mini: 't2_mini', punt: 't2_punt' },
    { label: 'T3', barthel: 't3_barthel', mini: 't3_mini', punt: 't3_punt' },
    { label: 'T4', barthel: 't4_barthel', mini: 't4_mini', punt: 't4_punt' },
  ] as const;

  const evolucionBarthel = trimestres.map(t => {
    const vals = pacientes
      .map(p => p[t.barthel as keyof Paciente])
      .filter((v): v is number => v != null && !isNaN(Number(v)))
      .map(Number);
    return { name: t.label, promedio: vals.length ? round1(avg(vals)) : null, n: vals.length };
  });

  const evolucionMini = trimestres.map(t => {
    const vals = pacientes
      .map(p => p[t.mini as keyof Paciente])
      .filter((v): v is number => v != null && !isNaN(Number(v)))
      .map(Number);
    return { name: t.label, promedio: vals.length ? round1(avg(vals)) : null, n: vals.length };
  });

  const cobertura = trimestres.map(t => {
    const n = pacientes.filter(p => p[t.barthel as keyof Paciente] != null).length;
    return { name: t.label, pacientes: n };
  });

  const hasBarthel = evolucionBarthel.some(d => d.promedio != null);
  const hasMini = evolucionMini.some(d => d.promedio != null);

  return (
    <div>
      <SectionTitle>Seguimiento Trimestral</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 24 }}>
        <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
          <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Evolución Barthel (Promedio)</div>
          {hasBarthel ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={evolucionBarthel} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(v) => [v, 'Promedio Barthel']} />
                <Line type="monotone" dataKey="promedio" stroke="#15803d" strokeWidth={2.5} dot={{ r: 5 }} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </div>

        <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
          <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Evolución Mini-Mental (Promedio)</div>
          {hasMini ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={evolucionMini} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 35]} />
                <Tooltip formatter={(v) => [v, 'Promedio Mini-Mental']} />
                <Line type="monotone" dataKey="promedio" stroke="#0f5c2e" strokeWidth={2.5} dot={{ r: 5 }} connectNulls={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </div>
      </div>

      <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
        <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Pacientes con Datos por Trimestre</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={cobertura} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="pacientes" name="Pacientes" fill="#22c55e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── SECCIÓN TEMPORAL ────────────────────────────────────────────────────────

function SeccionTemporal({ pacientes }: { pacientes: Paciente[] }) {
  // Ingresos por año/semestre
  const periodoMap: Record<string, number> = {};
  pacientes.forEach(p => {
    if (p.anio) {
      const key = p.semestre ? `${p.anio} S${p.semestre}` : `${p.anio}`;
      periodoMap[key] = (periodoMap[key] || 0) + 1;
    }
  });
  const periodoData = Object.entries(periodoMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, cantidad]) => ({ name, cantidad }));

  // Permanencia
  const permanencias: number[] = [];
  pacientes.forEach(p => {
    if (p.f_ingreso && p.f_egreso) {
      const ing = new Date(p.f_ingreso).getTime();
      const eg = new Date(p.f_egreso).getTime();
      if (!isNaN(ing) && !isNaN(eg) && eg >= ing) {
        permanencias.push(Math.round((eg - ing) / (1000 * 60 * 60 * 24)));
      }
    }
  });
  const promPermanencia = permanencias.length ? Math.round(avg(permanencias)) : null;

  const totalIngresos = pacientes.filter(p => p.f_ingreso).length;
  const totalEgresos = pacientes.filter(p => p.f_egreso).length;

  return (
    <div>
      <SectionTitle>Análisis Temporal</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Ingresos Registrados" value={totalIngresos} />
        <StatCard label="Total Egresos Registrados" value={totalEgresos} />
        <StatCard
          label="Promedio Permanencia"
          value={promPermanencia != null ? `${promPermanencia} días` : 'N/D'}
          sub={promPermanencia != null ? `sobre ${permanencias.length} pacientes con ingreso y egreso` : 'Sin datos de permanencia'}
        />
      </div>

      <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
        <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Ingresos por Período (Año/Semestre)</div>
        {periodoData.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={periodoData} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="cantidad" name="Ingresos" fill="#15803d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <NoData msg="No hay datos de período (año/semestre) registrados." />}
      </div>
    </div>
  );
}

// ─── SECCIÓN SOCIODEMOGRÁFICO ─────────────────────────────────────────────────

function SeccionSociodemo({ pacientes }: { pacientes: Paciente[] }) {
  function countMap(values: (string | undefined)[], labelDesconocido = 'No especificado') {
    const m: Record<string, number> = {};
    values.forEach(v => {
      const k = v?.trim() || labelDesconocido;
      m[k] = (m[k] || 0) + 1;
    });
    return Object.entries(m).map(([name, value]) => ({ name, value }));
  }

  const escolaridadData = countMap(pacientes.map(p => p.escolaridad));
  const puebloData = pacientes.map(p => {
    const v = p.pueblo?.trim();
    return !v || v === '' || v.toLowerCase() === 'ninguno' || v.toLowerCase() === 'no' ? 'Sin pueblo indígena' : 'Pueblo indígena';
  });
  const puebloPie = countMap(puebloData);
  const ruralData = countMap(pacientes.map(p => p.rural));
  const sectorMap: Record<string, number> = {};
  pacientes.forEach(p => {
    const k = p.sector?.trim() || p.comuna?.trim() || 'No especificado';
    sectorMap[k] = (sectorMap[k] || 0) + 1;
  });
  const sectorData = Object.entries(sectorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([name, cantidad]) => ({ name, cantidad }));

  return (
    <div>
      <SectionTitle>Perfil Sociodemográfico</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 24 }}>
        <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
          <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Nivel de Escolaridad</div>
          {escolaridadData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={escolaridadData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={pieLabelShort} labelLine={false}>
                  {escolaridadData.map((_, i) => <Cell key={i} fill={VERDE_COLORS[i % VERDE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </div>

        <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
          <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Pueblo Indígena</div>
          {puebloPie.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={puebloPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={pieLabel} labelLine={false}>
                  {puebloPie.map((_, i) => <Cell key={i} fill={VERDE_COLORS[i % VERDE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </div>

        <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
          <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Rural / Urbano</div>
          {ruralData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={ruralData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={pieLabel} labelLine={false}>
                  {ruralData.map((_, i) => <Cell key={i} fill={VERDE_COLORS[i % VERDE_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : <NoData />}
        </div>
      </div>

      <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0' }}>
        <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Distribución por Sector / Comuna (top 12)</div>
        {sectorData.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={sectorData} margin={{ top: 5, right: 20, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="cantidad" name="Pacientes" fill="#0f5c2e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <NoData />}
      </div>
    </div>
  );
}

// ─── SECCIÓN POR OPERADOR ─────────────────────────────────────────────────────

function SeccionOperador({ pacientes }: { pacientes: Paciente[] }) {
  const opMap: Record<string, { nombre: string; ids: string[]; barthel1s: number[]; mini1s: number[] }> = {};
  pacientes.forEach(p => {
    const id = p.operador_id || 'sin_operador';
    const nombre = p.operador_nombre || 'Sin operador';
    if (!opMap[id]) opMap[id] = { nombre, ids: [], barthel1s: [], mini1s: [] };
    opMap[id].ids.push(p.id);
    if (p.barthel1 != null) opMap[id].barthel1s.push(Number(p.barthel1));
    if (p.mini1 != null) opMap[id].mini1s.push(Number(p.mini1));
  });

  const rows = Object.entries(opMap).map(([id, d]) => ({
    id,
    nombre: d.nombre,
    total: d.ids.length,
    avgBarthel1: d.barthel1s.length ? round1(avg(d.barthel1s)) : null,
    avgMini1: d.mini1s.length ? round1(avg(d.mini1s)) : null,
  })).sort((a, b) => b.total - a.total);

  const barData = rows.map(r => ({ name: r.nombre.length > 18 ? r.nombre.slice(0, 18) + '…' : r.nombre, pacientes: r.total }));

  return (
    <div>
      <SectionTitle>Análisis por Operador</SectionTitle>
      <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Pacientes por Operador</div>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-35} textAnchor="end" interval={0} tick={{ fontSize: 11 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="pacientes" name="Pacientes" fill="#15803d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : <NoData />}
      </div>

      <div style={{ background: '#FFF', borderRadius: 10, padding: 20, border: '1px solid #E0E0E0', overflowX: 'auto' }}>
        <div style={{ fontWeight: 700, color: '#0f5c2e', marginBottom: 12 }}>Resumen por Operador</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#f0fdf4', borderBottom: '2px solid #15803d' }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: '#0f5c2e', fontWeight: 700 }}>Operador</th>
              <th style={{ textAlign: 'center', padding: '8px 12px', color: '#0f5c2e', fontWeight: 700 }}>Total Pacientes</th>
              <th style={{ textAlign: 'center', padding: '8px 12px', color: '#0f5c2e', fontWeight: 700 }}>Prom. Barthel 1ª</th>
              <th style={{ textAlign: 'center', padding: '8px 12px', color: '#0f5c2e', fontWeight: 700 }}>Prom. Mini-Mental 1ª</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #E0E0E0', background: i % 2 === 0 ? '#FFF' : '#FAFAF8' }}>
                <td style={{ padding: '8px 12px', color: '#333' }}>{r.nombre}</td>
                <td style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600, color: '#15803d' }}>{r.total}</td>
                <td style={{ padding: '8px 12px', textAlign: 'center', color: '#555' }}>{r.avgBarthel1 ?? '—'}</td>
                <td style={{ padding: '8px 12px', textAlign: 'center', color: '#555' }}>{r.avgMini1 ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export function AnalisisDatos({ onBack, esAdmin }: AnalisisDatosProps) {
  const { token } = useAuth();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabActiva, setTabActiva] = useState<Tab>('kpis');

  useEffect(() => {
    if (!token) return;
    setCargando(true);
    setError(null);
    patientsService.obtenerPacientes(token)
      .then(data => {
        setPacientes(data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error cargando pacientes para análisis:', err);
        setError('No se pudo cargar los datos de pacientes.');
        setCargando(false);
      });
  }, [token]);

  const tabs: { id: Tab; label: string }[] = useMemo(() => {
    const base: { id: Tab; label: string }[] = [
      { id: 'kpis', label: 'KPIs' },
      { id: 'vgi', label: 'VGI' },
      { id: 'trimestral', label: 'Trimestral' },
      { id: 'temporal', label: 'Temporal' },
      { id: 'sociodemografico', label: 'Sociodemográfico' },
    ];
    if (esAdmin) base.push({ id: 'operador', label: 'Por Operador' });
    return base;
  }, [esAdmin]);

  const tabStyle = (id: Tab): React.CSSProperties => ({
    padding: '9px 18px',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    transition: 'all 0.15s',
    background: tabActiva === id ? '#15803d' : 'rgba(255,255,255,0.15)',
    color: '#FFFFFF',
    borderBottom: tabActiva === id ? '3px solid #86efac' : '3px solid transparent',
  });

  return (
    <div style={{
      flex: 1,
      width: '100%',
      background: '#FAF7F2',
      fontFamily: "'Open Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      {/* Header */}
      <header style={{
        background: '#0f5c2e',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, paddingBottom: 8 }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '6px 14px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >
            ← Volver
          </button>
          <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 17 }}>Análisis de Datos</span>
          {!cargando && (
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginLeft: 4 }}>
              — {pacientes.length} pacientes cargados
            </span>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, paddingBottom: 0, flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} style={tabStyle(t.id)} onClick={() => setTabActiva(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {/* Body */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 60px', width: '100%' }}>
        {cargando && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{
              width: 40, height: 40, border: '4px solid #E0E0E0', borderTopColor: '#15803d',
              borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px',
            }} />
            <p style={{ color: '#666', fontSize: 14 }}>Cargando datos de pacientes…</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {!cargando && error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: 20, borderRadius: 10, fontSize: 14 }}>
            {error}
          </div>
        )}

        {!cargando && !error && (
          <>
            {tabActiva === 'kpis' && <SeccionKPIs pacientes={pacientes} />}
            {tabActiva === 'vgi' && <SeccionVGI pacientes={pacientes} />}
            {tabActiva === 'trimestral' && <SeccionTrimestral pacientes={pacientes} />}
            {tabActiva === 'temporal' && <SeccionTemporal pacientes={pacientes} />}
            {tabActiva === 'sociodemografico' && <SeccionSociodemo pacientes={pacientes} />}
            {tabActiva === 'operador' && esAdmin && <SeccionOperador pacientes={pacientes} />}
          </>
        )}
      </main>
    </div>
  );
}
