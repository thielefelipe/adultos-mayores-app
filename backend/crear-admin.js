const { Client } = require('pg');
const fs = require('fs');

const connectionString = 'postgresql://admin:5ZR21MkYYQN1ad8gqtqPJvVmpQAHydLa@dpg-d7ltnllckfvc739crllg-a.oregon-postgres.render.com:5432/centros_diurnos_db';

const sql = `-- Script para crear usuario admin en Render PostgreSQL
-- Primero, eliminar si existe (soft delete)
UPDATE usuarios SET activo = false WHERE username = 'admin';

-- Crear el usuario admin con contraseña hasheada: admin123
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
SELECT id, username, nombre, rol, activo FROM usuarios WHERE username = 'admin';`;

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    console.log('📡 Conectando a Render PostgreSQL...');
    await client.connect();
    console.log('✅ Conectado exitosamente');

    console.log('🔨 Ejecutando SQL...');
    const result = await client.query(sql);

    console.log('✅ Usuario admin creado exitosamente');
    console.log('\n📋 Resultado:');
    console.log(result.rows);

    console.log('\n🎉 Credenciales:');
    console.log('  Username: admin');
    console.log('  Password: admin123');
    console.log('  Rol: admin');

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
