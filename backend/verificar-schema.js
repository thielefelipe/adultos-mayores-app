const { Client } = require('pg');

const connectionString = 'postgresql://admin:5ZR21MkYYQN1ad8gqtqPJvVmpQAHydLa@dpg-d7ltnllckfvc739crllg-a.oregon-postgres.render.com:5432/centros_diurnos_db';

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    await client.connect();
    console.log('✅ Conectado a BD\n');

    // Obtener esquema de tabla usuarios
    console.log('📋 Columnas en tabla usuarios:');
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'usuarios'
      ORDER BY ordinal_position
    `);

    console.log(result.rows.map(r =>
      `  - ${r.column_name}: ${r.data_type} (nullable: ${r.is_nullable})`
    ).join('\n'));

    // Comparar con lo que debería tener
    console.log('\n📝 Columnas requeridas en UsuarioEntity:');
    const required = [
      'id', 'username', 'rut', 'nombre', 'password', 'rol',
      'email', 'telefono', 'region', 'provincia', 'comuna',
      'activo', 'creado', 'ultimoAcceso', 'actualizado'
    ];

    const existingColumns = result.rows.map(r => r.column_name);
    const missing = required.filter(col => !existingColumns.includes(col));

    if (missing.length === 0) {
      console.log('  ✅ Todas las columnas existen');
    } else {
      console.log('  ❌ Faltan columnas: ' + missing.join(', '));
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
