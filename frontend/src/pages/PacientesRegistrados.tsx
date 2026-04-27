import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { patientsService, type Paciente, type FiltrosPacientes } from '../services/patientsService';

interface PacientesRegistradosProps {
  onVolver: () => void;
  onLogout: () => void;
}

export function PacientesRegistrados({ onVolver, onLogout }: PacientesRegistradosProps) {
  const { usuario, token } = useAuth();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [regiones, setRegiones] = useState<{id: string, nombre: string}[]>([]);
  const [provincias, setProvincias] = useState<{id: string, nombre: string}[]>([]);
  const [comunas, setComunas] = useState<{id: string, nombre: string}[]>([]);
  const [operadores, setOperadores] = useState<{id: string, nombre: string}[]>([]);

  const [filtros, setFiltros] = useState<FiltrosPacientes>({});
  const [regionSeleccionada, setRegionSeleccionada] = useState('');
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');

  // Cargar regiones en el inicio
  useEffect(() => {
    console.log('PacientesRegistrados mounted, token:', token);
    if (token) {
      cargarRegiones();
      cargarOperadores();
      cargarPacientes();
    }
  }, [token]);

  // Cargar pacientes cuando cambien filtros
  useEffect(() => {
    cargarPacientes();
  }, [filtros]);

  // Cargar provincias cuando cambie región
  useEffect(() => {
    if (regionSeleccionada) {
      cargarProvincias(regionSeleccionada);
      setProvinciaSeleccionada('');
      setComunas([]);
    }
  }, [regionSeleccionada]);

  // Cargar comunas cuando cambie provincia
  useEffect(() => {
    if (provinciaSeleccionada) {
      cargarComunas(regionSeleccionada, provinciaSeleccionada);
    }
  }, [provinciaSeleccionada, regionSeleccionada]);

  const cargarRegiones = async () => {
    const mockRegiones = [
      { id: '1', nombre: 'Región Metropolitana' },
      { id: '2', nombre: 'Región de Valparaíso' },
      { id: '3', nombre: 'Región del Biobío' }
    ];

    try {
      const response = await fetch('https://adultos-mayores-backend.onrender.com/api/ubicacion/regiones');
      if (!response.ok) {
        console.warn('API no disponible, usando datos mock');
        setRegiones(mockRegiones);
        return;
      }
      const data = await response.json();
      console.log('Regiones cargadas:', data);
      setRegiones(data);
    } catch (error) {
      console.error('Error cargando regiones, usando mock:', error);
      setRegiones(mockRegiones);
    }
  };

  const cargarProvincias = async (region: string) => {
    const mockProvincias: Record<string, {id: string, nombre: string}[]> = {
      'Región Metropolitana': [
        { id: '1', nombre: 'Santiago' },
        { id: '2', nombre: 'Cordillera' }
      ],
      'Región de Valparaíso': [
        { id: '3', nombre: 'Valparaíso' }
      ],
      'Región del Biobío': [
        { id: '4', nombre: 'Concepción' }
      ]
    };

    try {
      const response = await fetch(`https://adultos-mayores-backend.onrender.com/api/ubicacion/provincias?region=${encodeURIComponent(region)}`);
      if (!response.ok) {
        const mock = mockProvincias[region] || [];
        console.warn('API no disponible, usando datos mock');
        setProvincias(mock);
        return;
      }
      const data = await response.json();
      setProvincias(data);
    } catch (error) {
      const mock = mockProvincias[region] || [];
      console.error('Error cargando provincias, usando mock:', error);
      setProvincias(mock);
    }
  };

  const cargarComunas = async (region: string, provincia: string) => {
    const mockComunas: Record<string, {id: string, nombre: string}[]> = {
      'Santiago': [
        { id: '1', nombre: 'Santiago' },
        { id: '2', nombre: 'Providencia' }
      ],
      'Cordillera': [
        { id: '3', nombre: 'San Bernardo' }
      ],
      'Valparaíso': [
        { id: '4', nombre: 'Valparaíso' }
      ],
      'Concepción': [
        { id: '5', nombre: 'Concepción' }
      ]
    };

    try {
      const response = await fetch(`https://adultos-mayores-backend.onrender.com/api/ubicacion/comunas?region=${encodeURIComponent(region)}&provincia=${encodeURIComponent(provincia)}`);
      if (!response.ok) {
        const mock = mockComunas[provincia] || [];
        console.warn('API no disponible, usando datos mock');
        setComunas(mock);
        return;
      }
      const data = await response.json();
      setComunas(data);
    } catch (error) {
      const mock = mockComunas[provincia] || [];
      console.error('Error cargando comunas, usando mock:', error);
      setComunas(mock);
    }
  };

  const cargarOperadores = async () => {
    try {
      if (token) {
        const ops = await patientsService.obtenerOperadores(token);
        setOperadores(ops);
      }
    } catch (error) {
      console.error('Error cargando operadores:', error);
    }
  };

  const cargarPacientes = async () => {
    setLoading(true);
    try {
      if (token) {
        const datos = await patientsService.obtenerPacientes(token, filtros);
        setPacientes(datos);
      }
    } catch (error) {
      console.error('Error cargando pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLimpiarFiltros = () => {
    setFiltros({});
    setRegionSeleccionada('');
    setProvinciaSeleccionada('');
    setProvincias([]);
    setComunas([]);
  };

  const handleRegionChange = (value: string) => {
    setRegionSeleccionada(value);
    setFiltros({ ...filtros, region: value || undefined, provincia: undefined, comuna: undefined });
  };

  const handleProvinciaChange = (value: string) => {
    setProvinciaSeleccionada(value);
    setFiltros({ ...filtros, provincia: value || undefined, comuna: undefined });
  };

  const handleComunaChange = (value: string) => {
    setFiltros({ ...filtros, comuna: value || undefined });
  };

  const handleOperadorChange = (value: string) => {
    setFiltros({ ...filtros, operador_id: value || undefined });
  };

  return (
    <div style={{
      flex: 1,
      width: '100%',
      background: '#FAF7F2',
      fontFamily: "'Open Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        background: '#003D82',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
      }}>
        <button onClick={onVolver} style={{
          background: 'rgba(255,255,255,.15)',
          color: '#FFFFFF',
          border: '1px solid rgba(255,255,255,.3)',
          padding: '6px 14px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600
        }}>← Volver</button>

        <span style={{ fontSize: 28 }}>MC</span>
        <div>
          <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 17 }}>
            Pacientes Registrados
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#FFFFFF', fontSize: 13 }}>
            Hola, <strong>{usuario?.nombre || usuario?.username}</strong>
          </span>
          <button onClick={onLogout} style={{
            background: '#0066CC',
            color: '#FFFFFF',
            border: 'none',
            padding: '7px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600
          }}>Cerrar sesión</button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 24px', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#003D82',
          marginBottom: 8,
          fontFamily: "'Montserrat', sans-serif"
        }}>Pacientes Registrados</h2>
        <p style={{ color: '#666666', fontSize: 14, marginBottom: 30 }}>
          Total de pacientes: <strong>{pacientes.length}</strong>
        </p>

        {/* Filtros */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 8,
          padding: '24px',
          marginBottom: 30,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.05)',
          border: '1px solid #E0E0E0'
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 700,
            color: '#003D82',
            marginBottom: 20,
            paddingBottom: 12,
            borderBottom: '2px solid #0066CC'
          }}>Filtros</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
            marginBottom: 20
          }}>
            {/* Región */}
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#003D82' }}>
                Región
              </label>
              <select
                value={regionSeleccionada}
                onChange={(e) => handleRegionChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: 'Open Sans'
                }}
              >
                <option value="">Seleccionar región...</option>
                {regiones.map(r => (
                  <option key={r.id} value={r.nombre}>{r.nombre}</option>
                ))}
              </select>
            </div>

            {/* Provincia */}
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#003D82' }}>
                Provincia
              </label>
              <select
                value={provinciaSeleccionada}
                onChange={(e) => handleProvinciaChange(e.target.value)}
                disabled={!regionSeleccionada}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: 'Open Sans',
                  opacity: regionSeleccionada ? 1 : 0.5
                }}
              >
                <option value="">Seleccionar provincia...</option>
                {provincias.map(p => (
                  <option key={p.id} value={p.nombre}>{p.nombre}</option>
                ))}
              </select>
            </div>

            {/* Comuna */}
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#003D82' }}>
                Comuna
              </label>
              <select
                value={filtros.comuna || ''}
                onChange={(e) => handleComunaChange(e.target.value)}
                disabled={!provinciaSeleccionada}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: 'Open Sans',
                  opacity: provinciaSeleccionada ? 1 : 0.5
                }}
              >
                <option value="">Seleccionar comuna...</option>
                {comunas.map(c => (
                  <option key={c.id} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
            </div>

            {/* Operador */}
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#003D82' }}>
                Operador
              </label>
              <select
                value={filtros.operador_id || ''}
                onChange={(e) => handleOperadorChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  fontFamily: 'Open Sans'
                }}
              >
                <option value="">Todos los operadores</option>
                {operadores.map(op => (
                  <option key={op.id} value={op.id}>{op.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleLimpiarFiltros}
            style={{
              background: '#FFFFFF',
              color: '#0066CC',
              border: '1px solid #0066CC',
              padding: '10px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 13,
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
            Limpiar filtros
          </button>
        </div>

        {/* Tabla de Pacientes */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
            Cargando pacientes...
          </div>
        ) : (
          <div style={{
            background: '#FFFFFF',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '2px solid #0066CC'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ background: '#0066CC', borderBottom: '2px solid #0066CC' }}>
                  <th style={{ padding: 15, textAlign: 'left', fontWeight: 600, color: 'white', fontSize: 14 }}>Nombre</th>
                  <th style={{ padding: 15, textAlign: 'left', fontWeight: 600, color: 'white', fontSize: 14 }}>Región / Provincia / Comuna</th>
                  <th style={{ padding: 15, textAlign: 'left', fontWeight: 600, color: 'white', fontSize: 14 }}>Operador</th>
                  <th style={{ padding: 15, textAlign: 'left', fontWeight: 600, color: 'white', fontSize: 14 }}>Fecha Registro</th>
                  <th style={{ padding: 15, textAlign: 'left', fontWeight: 600, color: 'white', fontSize: 14 }}>Teléfono / Email</th>
                  <th style={{ padding: 15, textAlign: 'left', fontWeight: 600, color: 'white', fontSize: 14 }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pacientes.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#666666' }}>
                      No se encontraron pacientes con los filtros seleccionados
                    </td>
                  </tr>
                ) : (
                  pacientes.map((paciente) => (
                    <tr
                      key={paciente.id}
                      style={{
                        borderBottom: '1px solid #E0E0E0',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = '#F5F9FF';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                      }}
                    >
                      <td style={{ padding: 15, color: '#003D82', fontWeight: 600, fontSize: 14 }}>
                        {paciente.nombre}
                      </td>
                      <td style={{ padding: 15, color: '#666666', fontSize: 14 }}>
                        {paciente.region} / {paciente.provincia} / {paciente.comuna}
                      </td>
                      <td style={{ padding: 15, color: '#666666', fontSize: 14 }}>
                        {paciente.operador_nombre}
                      </td>
                      <td style={{ padding: 15, color: '#666666', fontSize: 14 }}>
                        {new Date(paciente.fecha_registro).toLocaleDateString('es-CL')}
                      </td>
                      <td style={{ padding: 15, color: '#666666', fontSize: 14 }}>
                        <div>{paciente.telefono}</div>
                        <div style={{ fontSize: 12, color: '#999999' }}>{paciente.email}</div>
                      </td>
                      <td style={{ padding: 15, fontSize: 14 }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 600,
                          backgroundColor: paciente.estado === 'activo' ? '#D4EDDA' : '#F8D7DA',
                          color: paciente.estado === 'activo' ? '#155724' : '#721C24',
                          textTransform: 'uppercase'
                        }}>
                          {paciente.estado}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
