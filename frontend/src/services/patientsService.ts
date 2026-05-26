export interface Paciente {
  id: string;
  nombre: string;
  rut: string;
  dv: string;
  region: string;
  provincia: string;
  comuna: string;
  operador_id: string;
  operador_nombre: string;
  fecha_registro: string;
  telefono: string;
  email: string;
  estado: 'activo' | 'inactivo' | 'dado_de_alta' | 'pendiente_eliminacion';
  creadoPor: string;
  creadoPorNombre?: string;
  edad?: number;
  sexo?: string;
  dependencia?: string;
  // Datos sociodemográficos
  escolaridad?: string;
  pueblo?: string;
  rsh?: string;
  rural?: string;
  sector?: string;
  // Período
  anio?: number;
  semestre?: number;
  // Fechas
  f_ingreso?: string;
  f_egreso?: string;
  // Instrumentos VGI 1ª evaluación
  barthel1?: number;
  pfeiffer1?: number;
  lawton1?: number;
  tug1?: number;
  mini1?: number;
  yesa1?: number;
  eq1?: string;
  // Instrumentos VGI 2ª evaluación
  barthel2?: number;
  pfeiffer2?: number;
  lawton2?: number;
  tug2?: number;
  mini2?: number;
  yesa2?: number;
  eq2?: string;
  // Seguimiento trimestral
  t1_punt?: number;
  t1_barthel?: number;
  t1_mini?: number;
  t2_punt?: number;
  t2_barthel?: number;
  t2_mini?: number;
  t3_punt?: number;
  t3_barthel?: number;
  t3_mini?: number;
  t4_punt?: number;
  t4_barthel?: number;
  t4_mini?: number;
  // Notas clínicas y plan
  notas?: string;
  plan?: string;
}

export interface FiltrosPacientes {
  region?: string;
  provincia?: string;
  comuna?: string;
  operador_id?: string;
  anio?: number;
  semestre?: number;
}

export const patientsService = {
  async obtenerPacientes(token: string, filtros?: FiltrosPacientes) {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const params = new URLSearchParams();

      if (filtros?.anio) params.append('anio', String(filtros.anio));
      if (filtros?.semestre) params.append('semestre', String(filtros.semestre));
      if (filtros?.region) params.append('region', filtros.region);
      if (filtros?.provincia) params.append('provincia', filtros.provincia);
      if (filtros?.comuna) params.append('comuna', filtros.comuna);
      if (filtros?.operador_id) params.append('operador_id', filtros.operador_id);

      const url = `${apiUrl}/pacientes?${params.toString()}`;
      console.log('🔍 Obteniendo pacientes desde:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('📨 Respuesta del servidor:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error obteniendo pacientes:', response.status, errorText);
        return [];
      }

      const data = await response.json();
      console.log('📦 Datos recibidos:', data);

      // Si la respuesta tiene estructura con datos/total
      const pacientes = data.datos || data || [];
      console.log('✅ Pacientes procesados:', pacientes.length);

      return pacientes.map((p: any) => ({
        id: p.id,
        nombre: p.nombre,
        rut: p.rut,
        dv: p.dv,
        region: p.region || '',
        provincia: p.provincia || '',
        comuna: p.comuna || '',
        operador_id: p.operador_id || '',
        operador_nombre: p.operador_nombre || '',
        fecha_registro: p.fechaRegistro || p.fecha_registro,
        telefono: p.telefono || '',
        email: p.email || '',
        estado: p.estado || 'activo',
        creadoPor: p.creadoPor || p.operador_nombre || 'No especificado',
        creadoPorNombre: p.creadoPorNombre || p.creadoPor || 'No especificado',
        edad: p.edad,
        sexo: p.sexo,
        dependencia: p.dependencia,
        // Datos sociodemográficos
        escolaridad: p.escolaridad,
        pueblo: p.pueblo,
        rsh: p.rsh,
        rural: p.rural,
        sector: p.sector,
        // Período
        anio: p.anio,
        semestre: p.semestre,
        // Fechas
        f_ingreso: p.f_ingreso,
        f_egreso: p.f_egreso,
        // Instrumentos VGI 1ª evaluación
        barthel1: p.barthel1 != null ? Number(p.barthel1) : undefined,
        pfeiffer1: p.pfeiffer1 != null ? Number(p.pfeiffer1) : undefined,
        lawton1: p.lawton1 != null ? Number(p.lawton1) : undefined,
        tug1: p.tug1 != null ? Number(p.tug1) : undefined,
        mini1: p.mini1 != null ? Number(p.mini1) : undefined,
        yesa1: p.yesa1 != null ? Number(p.yesa1) : undefined,
        eq1: p.eq1,
        // Instrumentos VGI 2ª evaluación
        barthel2: p.barthel2 != null ? Number(p.barthel2) : undefined,
        pfeiffer2: p.pfeiffer2 != null ? Number(p.pfeiffer2) : undefined,
        lawton2: p.lawton2 != null ? Number(p.lawton2) : undefined,
        tug2: p.tug2 != null ? Number(p.tug2) : undefined,
        mini2: p.mini2 != null ? Number(p.mini2) : undefined,
        yesa2: p.yesa2 != null ? Number(p.yesa2) : undefined,
        eq2: p.eq2,
        // Seguimiento trimestral
        t1_punt: p.t1_punt != null ? Number(p.t1_punt) : undefined,
        t1_barthel: p.t1_barthel != null ? Number(p.t1_barthel) : undefined,
        t1_mini: p.t1_mini != null ? Number(p.t1_mini) : undefined,
        t2_punt: p.t2_punt != null ? Number(p.t2_punt) : undefined,
        t2_barthel: p.t2_barthel != null ? Number(p.t2_barthel) : undefined,
        t2_mini: p.t2_mini != null ? Number(p.t2_mini) : undefined,
        t3_punt: p.t3_punt != null ? Number(p.t3_punt) : undefined,
        t3_barthel: p.t3_barthel != null ? Number(p.t3_barthel) : undefined,
        t3_mini: p.t3_mini != null ? Number(p.t3_mini) : undefined,
        t4_punt: p.t4_punt != null ? Number(p.t4_punt) : undefined,
        t4_barthel: p.t4_barthel != null ? Number(p.t4_barthel) : undefined,
        t4_mini: p.t4_mini != null ? Number(p.t4_mini) : undefined,
        // Notas clínicas y plan
        notas: p.notas || undefined,
        plan: p.plan || undefined,
      }));
    } catch (error) {
      console.error('Error obteniendo pacientes:', error);
      return [];
    }
  },

  async obtenerTotal(token: string): Promise<number> {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
      const response = await fetch(`${apiUrl}/pacientes?limite=1`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) return 0;
      const data = await response.json();
      return data.total ?? 0;
    } catch {
      return 0;
    }
  },

  async obtenerOperadores(token: string) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/usuarios`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.warn('Error obteniendo operadores, usando datos vacíos');
        return [];
      }

      const usuarios = await response.json();
      // Filtrar solo operadores y analistas
      return usuarios
        .filter((u: any) => u.rol === 'operador' || u.rol === 'analista')
        .map((u: any) => ({ id: u.id, nombre: u.nombre }));
    } catch (error) {
      console.error('Error obteniendo operadores:', error);
      return [];
    }
  }
};
