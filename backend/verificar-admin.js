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

    const result = await client.query(
      'SELECT id, username, nombre, rol, activo FROM usuarios WHERE username = $1',
      ['admin']
    );

    if (result.rows.length === 0) {
      console.log('❌ No hay usuario admin en la BD');
    } else {
      console.log('✅ Usuario admin encontrado:');
      console.log(result.rows[0]);
    }

    // Listar todos los usuarios
    console.log('\n📋 Todos los usuarios:');
    const allUsers = await client.query('SELECT id, username, nombre, rol, activo FROM usuarios');
    console.log(allUsers.rows);

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
