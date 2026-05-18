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
  estado: 'activo' | 'inactivo';
  creadoPor: string;
  creadoPorNombre?: string;
  edad?: number;
  sexo?: string;
  dependencia?: string;
}

export interface FiltrosPacientes {
  region?: string;
  provincia?: string;
  comuna?: string;
  operador_id?: string;
  anio?: number;
  semestre?: number;
}

// Mock data - sera reemplazado por API real cuando esté disponible
const MOCK_PACIENTES: Paciente[] = [];

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
        estado: p.estado === 'activo' ? 'activo' : 'inactivo',
        creadoPor: p.creadoPor || p.operador_nombre || 'No especificado',
        edad: p.edad,
        sexo: p.sexo,
        dependencia: p.dependencia
      }));
    } catch (error) {
      console.error('Error obteniendo pacientes:', error);
      return [];
    }
  },

  async obtenerTotal(_token: string): Promise<number> {
    // TODO: Reemplazar con llamada real a /api/pacientes/total
    return MOCK_PACIENTES.length;
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
