-- Script para crear usuario admin en Render PostgreSQL
-- Ejecutar en la base de datos: centros_diurnos_db

-- Primero, eliminar si existe (soft delete)
UPDATE usuarios SET activo = false WHERE username = 'admin';

-- Crear el usuario admin con contraseña hasheada: admin123
-- Hash bcrypt de "admin123" con salt 10 rounds
INSERT INTO usuarios (
  id,
  username,
  nombre,
  password,
  rol,
  activo,
  creado,
  actualizado
) VALUES (
  gen_random_uuid(),
  'admin',
  'Administrador',
  '$2b$10$YOvWm4a2R8E4VmVGHxJ5WO6pFu2dXwVvOEX8YZHr8SZgCp8YKqz0W',
  'admin',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (username) DO UPDATE
SET
  activo = true,
  password = '$2b$10$YOvWm4a2R8E4VmVGHxJ5WO6pFu2dXwVvOEX8YZHr8SZgCp8YKqz0W',
  actualizado = NOW();

-- Verificar que se creó
SELECT id, username, nombre, rol, activo FROM usuarios WHERE username = 'admin';
