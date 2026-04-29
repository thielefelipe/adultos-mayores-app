import { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; nombre: string }[];
  placeholder?: string;
  required?: boolean;
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Seleccionar...',
  required = false
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.id === value);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      {/* Botón que simula el select */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '12px 14px',
          border: '2px solid #0066CC',
          borderRadius: 6,
          fontSize: 14,
          fontFamily: 'Open Sans',
          backgroundColor: '#FFFFFF',
          color: selectedOption ? '#003D82' : '#999999',
          fontWeight: 700,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'left'
        }}
      >
        <span>{selectedOption?.nombre || placeholder}</span>
        <span style={{ fontSize: 12, marginLeft: 'auto' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Dropdown de opciones */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            backgroundColor: '#FFFFFF',
            border: '2px solid #0066CC',
            borderRadius: 6,
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxHeight: 300,
            overflowY: 'auto'
          }}
        >
          {/* Opción vacía */}
          <div
            onClick={() => handleSelect('')}
            style={{
              padding: '12px 14px',
              cursor: 'pointer',
              backgroundColor: value === '' ? '#E8F3FF' : '#FFFFFF',
              color: '#999999',
              borderBottom: '1px solid #E0E0E0',
              transition: 'background 0.2s',
              fontWeight: 600,
              fontSize: 14
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#E8F3FF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                value === '' ? '#E8F3FF' : '#FFFFFF';
            }}
          >
            Seleccionar operador...
          </div>

          {/* Opciones */}
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option.id)}
              style={{
                padding: '12px 14px',
                cursor: 'pointer',
                backgroundColor: value === option.id ? '#E8F3FF' : '#FFFFFF',
                color: '#003D82',
                borderBottom: '1px solid #E0E0E0',
                transition: 'background 0.2s',
                fontWeight: value === option.id ? 700 : 600,
                fontSize: 14
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#F0F7FF';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  value === option.id ? '#E8F3FF' : '#FFFFFF';
              }}
            >
              {value === option.id && <span style={{ marginRight: 8 }}>✓ </span>}
              {option.nombre}
            </div>
          ))}
        </div>
      )}

      {/* Input hidden para mantener compatibilidad con formularios */}
      <input
        type="hidden"
        name="operador_id_custom"
        value={value}
        required={required}
      />
    </div>
  );
}
