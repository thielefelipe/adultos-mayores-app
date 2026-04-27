import { useState, useEffect } from 'react';

interface ModalAgregarPacienteProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pacienteData: any) => Promise<void>;
}

export function ModalAgregarPaciente({ isOpen, onClose, onSave }: ModalAgregarPacienteProps) {
  const [loading, setLoading] = useState(false);
  const [regiones, setRegiones] = useState<{ id: string; nombre: string }[]>([]);
  const [provincias, setProvincias] = useState<{ id: string; nombre: string }[]>([]);
  const [comunas, setComunas] = useState<{ id: string; nombre: string }[]>([]);

  const [formData, setFormData] = useState({
    rut: '',
    dv: '',
    nombre: '',
    sexo: '',
    edad: '',
    telefono: '',
    email: '',
    escolaridad: '',
    puebloOriginario: '',
    tramosRsh: '',
    fechaIngreso: '',
    region: '',
    provincia: '',
    comuna: '',
    ruralUrbana: '',
    dependencia: '',
    enfermedadesCronicas: ''
  });

  useEffect(() => {
    cargarRegiones();
  }, []);

  const cargarRegiones = async () => {
    const mockRegiones = [
      { id: '1', nombre: 'Región Metropolitana' },
      { id: '2', nombre: 'Región de Valparaíso' },
      { id: '3', nombre: 'Región del Biobío' }
    ];

    try {
      const response = await fetch('${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/ubicacion/regiones');
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((r: string | { id: string; nombre: string }, i: number) =>
          typeof r === 'string' ? { id: String(i), nombre: r } : r
        );
        setRegiones(formatted);
      } else {
        setRegiones(mockRegiones);
      }
    } catch {
      setRegiones(mockRegiones);
    }
  };

  const cargarProvincias = async (region: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/ubicacion/provincias?region=${encodeURIComponent(region)}`
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((p: string | { id: string; nombre: string }, i: number) =>
          typeof p === 'string' ? { id: String(i), nombre: p } : p
        );
        setProvincias(formatted);
      } else {
        setProvincias([]);
      }
    } catch {
      setProvincias([]);
    }
  };

  const cargarComunas = async (region: string, provincia: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/ubicacion/comunas?region=${encodeURIComponent(region)}&provincia=${encodeURIComponent(provincia)}`
      );
      if (!response.ok) throw new Error();
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const formatted = data.map((c: string | { id: string; nombre: string }, i: number) =>
          typeof c === 'string' ? { id: String(i), nombre: c } : c
        );
        setComunas(formatted);
      } else {
        setComunas([]);
      }
    } catch {
      setComunas([]);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'region') {
      cargarProvincias(value);
      setFormData(prev => ({ ...prev, provincia: '', comuna: '' }));
      setComunas([]);
    } else if (name === 'provincia') {
      cargarComunas(formData.region, value);
      setFormData(prev => ({ ...prev, comuna: '' }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
      setFormData({
        rut: '', dv: '', nombre: '', sexo: '', edad: '', telefono: '', email: '',
        escolaridad: '', puebloOriginario: '', tramosRsh: '', fechaIngreso: '',
        region: '', provincia: '', comuna: '', ruralUrbana: '', dependencia: '', enfermedadesCronicas: ''
      });
      onClose();
    } catch (error) {
      console.error('Error al guardar:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#FFFFFF',
        borderRadius: 14,
        width: '90%',
        maxWidth: 900,
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
      }}>
        {/* Header */}
        <div style={{
          background: '#003D82',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #0066CC'
        }}>
          <h2 style={{ color: '#FFFFFF', margin: 0 }}>Agregar Paciente</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: 24,
              cursor: 'pointer'
            }}>
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* Datos Personales */}
          <h3 style={{ color: '#003D82', marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
            📋 Datos Personales
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                RUT <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                name="rut"
                value={formData.rut}
                onChange={handleChange}
                placeholder="15234578"
                maxLength={9}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                DV
              </label>
              <input
                type="text"
                name="dv"
                value={formData.dv}
                onChange={handleChange}
                placeholder="K"
                maxLength={1}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
              Nombre Completo <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="MANUEL ANTONIO JIMÉNEZ CORTÉS"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #E0E0E0',
                borderRadius: 6,
                fontSize: 14
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Sexo
              </label>
              <select
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer'
                }}>
                <option value="">Seleccionar…</option>
                <option>Femenino</option>
                <option>Masculino</option>
                <option>No Binario</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Edad
              </label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                placeholder="75"
                min="60"
                max="120"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="975252578"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nombre@example.com"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Escolaridad
              </label>
              <select
                name="escolaridad"
                value={formData.escolaridad}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer'
                }}>
                <option value="">Seleccionar…</option>
                <option>Sin Escolaridad</option>
                <option>Básica Incompleta</option>
                <option>Básica Completa</option>
                <option>Media Incompleta</option>
                <option>Media Completa</option>
                <option>Superior Incompleta</option>
                <option>Superior Completa</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Pueblo Originario
              </label>
              <select
                name="puebloOriginario"
                value={formData.puebloOriginario}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer'
                }}>
                <option value="">Seleccionar…</option>
                <option>Sí</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Tramo RSH
              </label>
              <select
                name="tramosRsh"
                value={formData.tramosRsh}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer'
                }}>
                <option value="">Seleccionar…</option>
                <option>0%-40%</option>
                <option>41%-50%</option>
                <option>51%-60%</option>
                <option>61%-70%</option>
                <option>71%-80%</option>
                <option>81%-90%</option>
                <option>91%-100%</option>
              </select>
            </div>
          </div>

          {/* Ubicación y Atención */}
          <h3 style={{ color: '#003D82', marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
            🏥 Ubicación y Atención
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Fecha Ingreso
              </label>
              <input
                type="date"
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Región <span style={{ color: 'red' }}>*</span>
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer'
                }}>
                <option value="">Seleccionar…</option>
                {regiones.map(r => (
                  <option key={r.id} value={r.nombre}>{r.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Provincia
              </label>
              <select
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                disabled={!formData.region}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: formData.region ? 'pointer' : 'not-allowed',
                  opacity: formData.region ? 1 : 0.5
                }}>
                <option value="">Seleccionar…</option>
                {provincias.map(p => (
                  <option key={p.id} value={p.nombre}>{p.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Comuna
              </label>
              <select
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                disabled={!formData.provincia}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: formData.provincia ? 'pointer' : 'not-allowed',
                  opacity: formData.provincia ? 1 : 0.5
                }}>
                <option value="">Seleccionar…</option>
                {comunas.map(c => (
                  <option key={c.id} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Rural/Urbana
              </label>
              <select
                name="ruralUrbana"
                value={formData.ruralUrbana}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer'
                }}>
                <option value="">Seleccionar…</option>
                <option>Rural</option>
                <option>Urbana</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Nivel Dependencia
              </label>
              <select
                name="dependencia"
                value={formData.dependencia}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer'
                }}>
                <option value="">Seleccionar…</option>
                <option>Leve</option>
                <option>Moderada</option>
                <option>Severa</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#003D82' }}>
                Enfermedades Crónicas
              </label>
              <select
                name="enfermedadesCronicas"
                value={formData.enfermedadesCronicas}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer'
                }}>
                <option value="">Seleccionar…</option>
                <option>Hipertensión</option>
                <option>DM tipo 1</option>
                <option>DM tipo 2</option>
                <option>Epiléptico</option>
                <option>EPOC</option>
                <option>Dislipidemia</option>
                <option>Obesidad</option>
                <option>Artritis Reumatoide</option>
                <option>Artrosis</option>
                <option>Cardiopatía Coronaria</option>
                <option>Secuela ACV</option>
                <option>Parkinson</option>
                <option>Asma</option>
                <option>Enfermedad Renal Crónica</option>
                <option>Cáncer</option>
                <option>Otro</option>
              </select>
            </div>
          </div>

          {/* Botones */}
          <div style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'flex-end',
            borderTop: '1px solid #E0E0E0',
            paddingTop: 20
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              style={{
                padding: '10px 24px',
                border: '1px solid #0066CC',
                background: '#FFFFFF',
                color: '#0066CC',
                borderRadius: 6,
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13
              }}>
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 24px',
                background: '#0066CC',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 6,
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 600,
                fontSize: 13,
                opacity: loading ? 0.7 : 1
              }}>
              {loading ? 'Guardando...' : 'Guardar Paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
