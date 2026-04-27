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

    // Verificar si la columna rut existe
    const checkColumn = await client.query(`
      SELECT column_name FROM information_schema.columns
      WHERE table_name = 'usuarios' AND column_name = 'rut'
    `);

    if (checkColumn.rows.length === 0) {
      console.log('⚠️  Columna rut no existe. Agregando...');
      await client.query(`
        ALTER TABLE usuarios
        ADD COLUMN rut VARCHAR(12) UNIQUE
      `);
      console.log('✅ Columna rut agregada correctamente');
    } else {
      console.log('✅ Columna rut ya existe');
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
