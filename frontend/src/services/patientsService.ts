export interface Paciente {
  id: string;
  nombre: string;
  region: string;
  provincia: string;
  comuna: string;
  operador_id: string;
  operador_nombre: string;
  fecha_registro: string;
  telefono: string;
  email: string;
  estado: 'activo' | 'inactivo';
}

export interface FiltrosPacientes {
  region?: string;
  provincia?: string;
  comuna?: string;
  operador_id?: string;
}

// Mock data - sera reemplazado por API real cuando esté disponible
const MOCK_PACIENTES: Paciente[] = [];

export const patientsService = {
  async obtenerPacientes(_token: string, filtros?: FiltrosPacientes) {
    // TODO: Reemplazar con llamada real a /api/pacientes
    // const response = await fetch(`${API_BASE}/pacientes`, { ... });

    let resultado = [...MOCK_PACIENTES];

    if (filtros) {
      if (filtros.region) {
        resultado = resultado.filter(p => p.region === filtros.region);
      }
      if (filtros.provincia) {
        resultado = resultado.filter(p => p.provincia === filtros.provincia);
      }
      if (filtros.comuna) {
        resultado = resultado.filter(p => p.comuna === filtros.comuna);
      }
      if (filtros.operador_id) {
        resultado = resultado.filter(p => p.operador_id === filtros.operador_id);
      }
    }

    return resultado;
  },

  async obtenerTotal(_token: string): Promise<number> {
    // TODO: Reemplazar con llamada real a /api/pacientes/total
    return MOCK_PACIENTES.length;
  },

  async obtenerOperadores(_token: string) {
    // TODO: Reemplazar con llamada real a /api/operadores
    return [
      { id: '1', nombre: 'Carlos López' },
      { id: '2', nombre: 'Ana Rodríguez' },
      { id: '3', nombre: 'Miguel Torres' }
    ];
  }
};
