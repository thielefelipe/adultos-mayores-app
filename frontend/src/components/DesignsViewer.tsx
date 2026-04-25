import { useState } from 'react';
import './DesignsViewer.css';

const DESIGNS = [
  { id: 'login', name: 'Login', path: '/designs/login-screen.svg' },
  { id: 'dashboard', name: 'Dashboard', path: '/designs/dashboard-screen.svg' },
  { id: 'usuarios', name: 'Gestión Usuarios', path: '/designs/usuarios-screen.svg' },
  { id: 'crear', name: 'Crear Usuario', path: '/designs/crear-usuario-screen.svg' },
  { id: 'detalles', name: 'Detalles Usuario', path: '/designs/detalles-usuario-screen.svg' },
];

export function DesignsViewer() {
  const [selectedDesign, setSelectedDesign] = useState('login');
  const current = DESIGNS.find(d => d.id === selectedDesign);

  return (
    <div className="designs-viewer">
      <div className="designs-sidebar">
        <h3>Diseños</h3>
        {DESIGNS.map(design => (
          <button
            key={design.id}
            className={`design-btn ${selectedDesign === design.id ? 'active' : ''}`}
            onClick={() => setSelectedDesign(design.id)}
          >
            {design.name}
          </button>
        ))}
      </div>
      <div className="designs-content">
        {current && (
          <object
            data={current.path}
            type="image/svg+xml"
            className="design-object"
          >
            <img
              src={current.path}
              alt={current.name}
              className="design-image"
            />
          </object>
        )}
      </div>
    </div>
  );
}
