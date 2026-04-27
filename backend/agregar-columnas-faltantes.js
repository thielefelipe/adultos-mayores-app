const { Client } = require('pg');

const connectionString = 'postgresql://admin:5ZR21MkYYQN1ad8gqtqPJvVmpQAHydLa@dpg-d7ltnllckfvc739crllg-a.oregon-postgres.render.com:5432/centros_diurnos_db';

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    await client.connect();
    console.log('✅ Conectado a BD');

    // Agregar columna rut si no existe
    try {
      await client.query(`
        ALTER TABLE usuarios
        ADD COLUMN rut VARCHAR(12) UNIQUE NULL
      `);
      console.log('✅ Columna rut agregada');
    } catch (err) {
      if (err.code === '42701') { // column already exists
        console.log('✅ Columna rut ya existe');
      } else {
        throw err;
      }
    }

    // Verificar que se agregó
    const checkResult = await client.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'usuarios' AND column_name = 'rut'
    `);

    if (checkResult.rows.length > 0) {
      console.log('✅ Verificación: columna rut existe');
    } else {
      console.log('❌ Verificación: columna rut NO existe');
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
