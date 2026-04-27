const { Client } = require('pg');
const bcrypt = require('bcrypt');

const connectionString = 'postgresql://admin:5ZR21MkYYQN1ad8gqtqPJvVmpQAHydLa@dpg-d7ltnllckfvc739crllg-a.oregon-postgres.render.com:5432/centros_diurnos_db';

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  try {
    console.log('🔐 Generando hash de contraseña...');
    const passwordHash = await bcrypt.hash('admin123', 10);
    console.log('Hash generado:', passwordHash);

    await client.connect();
    console.log('✅ Conectado a BD');

    console.log('🔄 Actualizando contraseña del admin...');
    const result = await client.query(
      'UPDATE usuarios SET password = $1 WHERE username = $2 RETURNING username, id, rol',
      [passwordHash, 'admin']
    );

    if (result.rowCount === 0) {
      console.log('❌ Usuario admin no encontrado');
    } else {
      console.log('✅ Contraseña actualizada:');
      console.log(result.rows[0]);
      console.log('\n🎉 Ahora puedes hacer login con:');
      console.log('  Username: admin');
      console.log('  Password: admin123');
    }

  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
