import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usuariosService } from '../services/usuariosService';
import './Modal.css';

const API_URL = 'https://adultos-mayores-backend.onrender.com/api';

interface ModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function ModalCrearUsuario({ onConfirm, onCancel }: ModalProps) {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    rut: '',
    username: '',
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    rol: 'operador',
    region: '',
    provincia: '',
    comuna: '',
  });

  const [regiones, setRegiones] = useState<string[]>([]);
  const [provincias, setProvincias] = useState<string[]>([]);
  const [comunas, setComunas] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    obtenerRegiones();
  }, []);

  useEffect(() => {
    if (formData.region) {
      obtenerProvincias();
      setFormData((prev) => ({ ...prev, provincia: '', comuna: '' }));
    }
  }, [formData.region]);

  useEffect(() => {
    if (formData.region && formData.provincia) {
      obtenerComunas();
      setFormData((prev) => ({ ...prev, comuna: '' }));
    }
  }, [formData.provincia]);

  const obtenerRegiones = async () => {
    try {
      const response = await fetch(`${API_URL}/ubicacion/regiones`);
      if (!response.ok) throw new Error('Error al obtener regiones');
      const data = await response.json();
      if (Array.isArray(data)) {
        setRegiones(data);
      } else {
        console.error('Respuesta no es un array:', data);
        setRegiones([]);
      }
    } catch (err) {
      console.error('Error al obtener regiones:', err);
      setRegiones([]);
    }
  };

  const obtenerProvincias = async () => {
    try {
      const response = await fetch(`${API_URL}/ubicacion/provincias?region=${encodeURIComponent(formData.region)}`);
      if (!response.ok) throw new Error('Error al obtener provincias');
      const data = await response.json();
      if (Array.isArray(data)) {
        setProvincias(data);
      } else {
        console.error('Respuesta no es un array:', data);
        setProvincias([]);
      }
    } catch (err) {
      console.error('Error al obtener provincias:', err);
      setProvincias([]);
    }
  };

  const obtenerComunas = async () => {
    try {
      const response = await fetch(`${API_URL}/ubicacion/comunas?region=${encodeURIComponent(formData.region)}&provincia=${encodeURIComponent(formData.provincia)}`);
      if (!response.ok) throw new Error('Error al obtener comunas');
      const data = await response.json();
      if (Array.isArray(data)) {
        setComunas(data);
      } else {
        console.error('Respuesta no es un array:', data);
        setComunas([]);
      }
    } catch (err) {
      console.error('Error al obtener comunas:', err);
      setComunas([]);
    }
  };

  const formatRut = (rut: string): string => {
    const cleanRut = rut.replace(/[^0-9kK]/g, '');
    if (cleanRut.length < 8) return rut;
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formatted}-${dv}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'rut') {
      const formattedRut = formatRut(value);
      const cleanRut = value.replace(/[^0-9kK]/g, '');
      const rutWithoutDV = cleanRut.slice(0, -1);

      setFormData((prev) => ({
        ...prev,
        rut: formattedRut,
        username: cleanRut.toLowerCase(),
        password: rutWithoutDV,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!token) return null;

  const handleConfirm = async () => {
    if (!formData.rut || !formData.nombre || !formData.password) {
      setError('RUT, nombre y contraseña son requeridos');
      return;
    }

    const cleanRut = formData.rut.replace(/[^0-9kK]/g, '');
    if (cleanRut.length < 8) {
      setError('RUT inválido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await usuariosService.crear(formData, token);
      alert(`✅ Usuario ${formData.nombre} creado exitosamente\nUsuario: ${formData.username}\nContraseña: ${formData.password}`);
      onConfirm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <h3>➕ Crear Usuario</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="rut">RUT:</label>
            <input
              id="rut"
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              placeholder="19.747.981-7"
              disabled={loading}
              autoFocus
            />
            <small>Ej: 19747981-7 o 19.747.981-7 (se formatea automáticamente)</small>
          </div>

          <div className="form-group">
            <label htmlFor="username">Usuario (RUT):</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              disabled
              readOnly
            />
            <small>Se llena automáticamente con el RUT</small>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña (RUT sin DV):</label>
            <input
              id="password"
              type="text"
              name="password"
              value={formData.password}
              disabled
              readOnly
            />
            <small>Se llena automáticamente (RUT sin dígito verificador)</small>
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre completo:</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              id="telefono"
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="+56912345678"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="region">Región:</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Selecciona una región</option>
              {regiones.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {formData.region && (
            <div className="form-group">
              <label htmlFor="provincia">Provincia:</label>
              <select
                id="provincia"
                name="provincia"
                value={formData.provincia}
                onChange={handleChange}
                disabled={loading || provincias.length === 0}
              >
                <option value="">Selecciona una provincia</option>
                {provincias.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formData.provincia && (
            <div className="form-group">
              <label htmlFor="comuna">Comuna:</label>
              <select
                id="comuna"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                disabled={loading || comunas.length === 0}
              >
                <option value="">Selecciona una comuna</option>
                {comunas.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="rol">Rol:</label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="operador">Operador</option>
              <option value="analista">Analista</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </button>
          <button
            className="btn-primary"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? '⏳ Creando...' : '➕ Crear Usuario'}
          </button>
        </div>
      </div>
    </div>
  );
}
