import { useState, useEffect } from 'react';
import { CustomSelect } from './CustomSelect';

interface ModalAgregarPacienteProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pacienteData: any) => Promise<void>;
  usuario?: any;
  operadores?: { id: string; nombre: string }[];
}

export function ModalAgregarPaciente({ isOpen, onClose, onSave, usuario, operadores }: ModalAgregarPacienteProps) {
  const [loading, setLoading] = useState(false);
  const [regiones, setRegiones] = useState<{ id: string; nombre: string }[]>([]);
  const [provincias, setProvincias] = useState<{ id: string; nombre: string }[]>([]);
  const [comunas, setComunas] = useState<{ id: string; nombre: string }[]>([]);

  const [formData, setFormData] = useState({
    rut: '',
    dv: '',
    nombre: '',
    sexo: '',
    fecha_nacimiento: '',
    edad: '',
    telefono: '',
    escolaridad: '',
    pueblo: '',
    rsh: '',
    anio: new Date().getFullYear().toString(),
    semestre: '1',
    f_ingreso: '',
    region: '',
    provincia: '',
    comuna: '',
    rural: '',
    dependencia: '',
    enfermedades: '',
    operador_id: usuario?.rol === 'admin' ? 'SISTEMA' : '',
    profesional_test: '',
  });

  const [archivosSeleccionados, setArchivosSeleccionados] = useState<File[]>([]);

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
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/ubicacion/regiones`);
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

  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const nuevos = Array.from(e.target.files);
      setArchivosSeleccionados(prev => [...prev, ...nuevos]);
      e.target.value = '';
    }
  };

  const quitarArchivo = (index: number) => {
    setArchivosSeleccionados(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Transform empty strings to undefined and convert types correctly
      const dataToSave = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value === '') return acc;

        // Convertir números
        if (['anio', 'semestre', 'edad'].includes(key) && value) {
          acc[key] = Number(value);
        }
        // Convertir fechas a ISO string
        else if (['fecha_nacimiento', 'f_ingreso'].includes(key) && value) {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            acc[key] = date.toISOString();
          }
        }
        else {
          acc[key] = value;
        }
        return acc;
      }, {} as any);

      const pacienteCreado = await onSave(dataToSave);

      // Subir documentos si hay archivos seleccionados
      if (archivosSeleccionados.length > 0 && pacienteCreado?.id) {
        const formDataArchivos = new FormData();
        archivosSeleccionados.forEach(file => formDataArchivos.append('files', file));
        try {
          const token = localStorage.getItem('token');
          await fetch(
            `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/pacientes/${pacienteCreado.id}/documentos`,
            {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` },
              body: formDataArchivos,
            }
          );
        } catch (err) {
          console.error('Error al subir documentos:', err);
        }
      }

      setFormData({
        rut: '', dv: '', nombre: '', sexo: '', fecha_nacimiento: '', edad: '', telefono: '',
        escolaridad: '', pueblo: '', rsh: '',
        anio: new Date().getFullYear().toString(), semestre: '1',
        f_ingreso: '',
        region: '', provincia: '', comuna: '', rural: '', dependencia: '', enfermedades: '',
        operador_id: usuario?.rol === 'admin' ? 'SISTEMA' : '',
        profesional_test: '',
      });
      setArchivosSeleccionados([]);
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
          background: '#0f5c2e',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #15803d'
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
          {/* Período */}
          <h3 style={{ color: '#0f5c2e', marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
            📅 Período
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
                Año <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="number"
                name="anio"
                value={formData.anio}
                onChange={handleChange}
                min={2000}
                max={new Date().getFullYear() + 1}
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
                Semestre <span style={{ color: 'red' }}>*</span>
              </label>
              <select
                name="semestre"
                value={formData.semestre}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  fontSize: 14,
                  cursor: 'pointer'
                }}
              >
                <option value="">Selecciona semestre</option>
                <option value="1">Semestre 1 (Enero - Junio)</option>
                <option value="2">Semestre 2 (Julio - Diciembre)</option>
              </select>
            </div>
          </div>

          {/* Datos Personales */}
          <h3 style={{ color: '#0f5c2e', marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
            📋 Datos Personales
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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

          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
                Pueblo Originario
              </label>
              <select
                name="pueblo"
                value={formData.pueblo}
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
                Tramo RSH
              </label>
              <select
                name="rsh"
                value={formData.rsh}
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
          <h3 style={{ color: '#0f5c2e', marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
            🏥 Ubicación y Atención
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 16,
            marginBottom: 24
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
                Fecha Ingreso
              </label>
              <input
                type="date"
                name="f_ingreso"
                value={formData.f_ingreso}
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

            {usuario?.rol !== 'admin' && (
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
                  Operador <span style={{ color: 'red' }}>*</span>
                </label>
                <CustomSelect
                  value={formData.operador_id}
                  onChange={(value) => setFormData(prev => ({ ...prev, operador_id: value }))}
                  options={operadores || []}
                  required={true}
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
                Rural/Urbana
              </label>
              <select
                name="rural"
                value={formData.rural}
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
                Enfermedades Crónicas
              </label>
              <select
                name="enfermedades"
                value={formData.enfermedades}
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

          {/* Profesional y Documentos */}
          <h3 style={{ color: '#0f5c2e', marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
            👨‍⚕️ Profesional y Documentos
          </h3>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
              Profesional que realizó los test
            </label>
            <input
              type="text"
              name="profesional_test"
              value={formData.profesional_test}
              onChange={handleChange}
              placeholder="Ej: Dr. Juan Pérez / Kinesióloga María González"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #E0E0E0',
                borderRadius: 6,
                fontSize: 14,
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 13, color: '#0f5c2e' }}>
              Documentos adjuntos{' '}
              <span style={{ fontWeight: 400, color: '#6b7280', fontSize: 12 }}>
                (opcional — exámenes, informes, etc.)
              </span>
            </label>

            {/* Zona de carga */}
            <label style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed #bbf7d0',
              borderRadius: 8,
              padding: '20px 16px',
              cursor: 'pointer',
              background: '#f0fdf4',
              transition: 'border-color 0.2s',
              marginBottom: 12
            }}>
              <span style={{ fontSize: 28 }}>📎</span>
              <span style={{ color: '#15803d', fontWeight: 600, fontSize: 13, marginTop: 6 }}>
                Seleccionar archivos
              </span>
              <span style={{ color: '#9ca3af', fontSize: 11, marginTop: 4 }}>
                PDF, Word, Excel, imágenes · Máx. 10 MB por archivo
              </span>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.xls,.xlsx,.csv,.txt"
                onChange={handleArchivoChange}
                style={{ display: 'none' }}
              />
            </label>

            {/* Lista de archivos seleccionados */}
            {archivosSeleccionados.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {archivosSeleccionados.map((file, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: 13
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#374151', overflow: 'hidden' }}>
                      <span style={{ fontSize: 16 }}>
                        {file.name.match(/\.(pdf)$/i) ? '📄' :
                         file.name.match(/\.(doc|docx)$/i) ? '📝' :
                         file.name.match(/\.(xls|xlsx|csv)$/i) ? '📊' :
                         file.name.match(/\.(jpg|jpeg|png|gif)$/i) ? '🖼️' : '📎'}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {file.name}
                      </span>
                      <span style={{ color: '#9ca3af', flexShrink: 0 }}>
                        ({(file.size / 1024).toFixed(0)} KB)
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => quitarArchivo(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: 16,
                        padding: '0 4px',
                        flexShrink: 0
                      }}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                border: '1px solid #15803d',
                background: '#FFFFFF',
                color: '#15803d',
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
                background: '#15803d',
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
