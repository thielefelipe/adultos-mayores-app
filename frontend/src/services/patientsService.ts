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
const MOCK_PACIENTES: Paciente[] = [
  {
    id: '1',
    nombre: 'Juan Pérez García',
    region: 'Región Metropolitana',
    provincia: 'Santiago',
    comuna: 'Santiago',
    operador_id: '1',
    operador_nombre: 'Carlos López',
    fecha_registro: '2024-01-15',
    telefono: '+56987654321',
    email: 'juan.perez@example.com',
    estado: 'activo'
  },
  {
    id: '2',
    nombre: 'María González Martínez',
    region: 'Región Metropolitana',
    provincia: 'Santiago',
    comuna: 'Providencia',
    operador_id: '2',
    operador_nombre: 'Ana Rodríguez',
    fecha_registro: '2024-01-20',
    telefono: '+56912345678',
    email: 'maria.gonzalez@example.com',
    estado: 'activo'
  },
  {
    id: '3',
    nombre: 'Roberto Silva Morales',
    region: 'Región de Valparaíso',
    provincia: 'Valparaíso',
    comuna: 'Valparaíso',
    operador_id: '1',
    operador_nombre: 'Carlos López',
    fecha_registro: '2024-02-01',
    telefono: '+56998765432',
    email: 'roberto.silva@example.com',
    estado: 'inactivo'
  },
  {
    id: '4',
    nombre: 'Carmen Ramírez López',
    region: 'Región Metropolitana',
    provincia: 'Cordillera',
    comuna: 'San Bernardo',
    operador_id: '3',
    operador_nombre: 'Miguel Torres',
    fecha_registro: '2024-02-10',
    telefono: '+56923456789',
    email: 'carmen.ramirez@example.com',
    estado: 'activo'
  },
  {
    id: '5',
    nombre: 'Francisco Díaz Fernández',
    region: 'Región del Biobío',
    provincia: 'Concepción',
    comuna: 'Concepción',
    operador_id: '2',
    operador_nombre: 'Ana Rodríguez',
    fecha_registro: '2024-02-15',
    telefono: '+56934567890',
    email: 'francisco.diaz@example.com',
    estado: 'activo'
  }
];

export const patientsService = {
  async obtenerPacientes(token: string, filtros?: FiltrosPacientes) {
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

  async obtenerTotal(token: string): Promise<number> {
    // TODO: Reemplazar con llamada real a /api/pacientes/total
    return MOCK_PACIENTES.length;
  },

  async obtenerOperadores(token: string) {
    // TODO: Reemplazar con llamada real a /api/operadores
    return [
      { id: '1', nombre: 'Carlos López' },
      { id: '2', nombre: 'Ana Rodríguez' },
      { id: '3', nombre: 'Miguel Torres' }
    ];
  }
};
