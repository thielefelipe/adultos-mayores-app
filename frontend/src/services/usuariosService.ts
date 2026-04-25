import * as XLSX from 'xlsx';

const API_URL = 'https://adultos-mayores-backend.onrender.com/api';

export interface Usuario {
  id: string;
  username: string;
  nombre: string;
  rol: 'admin' | 'operador' | 'analista';
  email?: string;
  telefono?: string;
  region?: string;
  provincia?: string;
  comuna?: string;
  activo?: boolean;
  creado?: string;
  ultimoAcceso?: string;
}

export const usuariosService = {
  async obtenerTodos(token: string): Promise<Usuario[]> {
    const response = await fetch(`${API_URL}/usuarios`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Error al obtener usuarios');
    return response.json();
  },

  async obtenerPorId(id: string, token: string): Promise<Usuario> {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    if (!response.ok) throw new Error('Usuario no encontrado');
    return response.json();
  },

  async crear(
    usuario: { username: string; nombre: string; password: string; rol: string },
    token: string,
  ): Promise<Usuario> {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Error al crear usuario');
    }
    return response.json();
  },

  async actualizar(
    id: string,
    datos: { nombre?: string; rol?: string },
    token: string,
  ): Promise<Usuario> {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) throw new Error('Error al actualizar usuario');
    return response.json();
  },

  async restablecerContrasena(
    id: string,
    passwordNueva: string,
    token: string,
  ): Promise<{ mensaje: string }> {
    const response = await fetch(`${API_URL}/usuarios/${id}/restablecer-contrasena`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        passwordNueva,
        passwordConfirmacion: passwordNueva,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Error al restablecer contraseña');
    }
    return response.json();
  },

  async cambiarContrasena(
    passwordActual: string,
    passwordNueva: string,
    token: string,
  ): Promise<{ mensaje: string }> {
    const response = await fetch(`${API_URL}/usuarios/cambiar-contrasena`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ passwordActual, passwordNueva }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Error al cambiar contraseña');
    }
    return response.json();
  },

  async eliminar(id: string, passwordConfirmacion: string, token: string) {
    const response = await fetch(`${API_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ passwordConfirmacion }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.message || 'Error al eliminar usuario');
    }
    return response.json();
  },

  exportarExcel(usuarios: Usuario[]): void {
    const datosExportacion = usuarios.map((usuario) => ({
      ID: usuario.id,
      Usuario: usuario.username,
      Nombre: usuario.nombre,
      Email: usuario.email || '',
      Teléfono: usuario.telefono || '',
      Rol: usuario.rol?.toUpperCase() || '',
      Región: usuario.region || '',
      Provincia: usuario.provincia || '',
      Comuna: usuario.comuna || '',
      Activo: usuario.activo ? 'Sí' : 'No',
      'Fecha Creación': usuario.creado
        ? new Date(usuario.creado).toLocaleDateString('es-CL')
        : '',
      'Último Acceso': usuario.ultimoAcceso
        ? new Date(usuario.ultimoAcceso).toLocaleDateString('es-CL')
        : 'Nunca',
    }));

    const ws = XLSX.utils.json_to_sheet(datosExportacion);

    // Ancho de columnas (12 columnas ahora)
    ws['!cols'] = [
      { wch: 36 }, // ID
      { wch: 15 }, // Usuario
      { wch: 20 }, // Nombre
      { wch: 25 }, // Email
      { wch: 15 }, // Teléfono
      { wch: 12 }, // Rol
      { wch: 15 }, // Región
      { wch: 15 }, // Provincia
      { wch: 15 }, // Comuna
      { wch: 10 }, // Activo
      { wch: 15 }, // Fecha Creación
      { wch: 15 }, // Último Acceso
    ];

    // Agregar filtros automáticos
    ws['!autofilter'] = { ref: `A1:L${datosExportacion.length + 1}` };

    // Formatear encabezados
    for (let col = 0; col < 12; col++) {
      const cellRef = XLSX.utils.encode_col(col) + '1';
      if (ws[cellRef]) {
        ws[cellRef].s = {
          font: { bold: true, color: { rgb: 'FFFFFF' } },
          fill: { fgColor: { rgb: 'E8A05C' } }, // Color warm del diseño
          alignment: { horizontal: 'center', vertical: 'center' },
        };
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

    const fecha = new Date().toLocaleDateString('es-CL').replace(/\//g, '-');
    XLSX.writeFile(wb, `usuarios-exportacion-${fecha}.xlsx`);
  },
};
