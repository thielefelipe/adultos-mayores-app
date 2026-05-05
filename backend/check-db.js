const { Client } = require('pg');

async function checkPatients() {
  const client = new Client({
    host: 'dpg-d7ltnllckfvc739crllg-a.oregon-postgres.render.com',
    port: 5432,
    database: 'centros_diurnos_db',
    user: 'admin',
    password: '5ZR21MkYYQN1ad8gqtqPJvVmpQAHydLa',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    await client.connect();
    console.log('✅ Conectado a BD');
    
    const result = await client.query('SELECT COUNT(*) as count FROM pacientes');
    const count = result.rows[0].count;
    console.log(`\n📊 Total de pacientes: ${count}`);
    
    if (count > 0) {
      const patients = await client.query('SELECT id, nombre, operador_id, creado FROM pacientes ORDER BY creado DESC LIMIT 5');
      console.log('\n📋 Últimos 5 pacientes:');
      patients.rows.forEach((p, i) => {
        console.log(`${i+1}. ${p.nombre} (ID: ${p.id}, Operador: ${p.operador_id}, Creado: ${p.creado})`);
      });
    } else {
      console.log('\n⚠️ No hay pacientes registrados en la BD');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
}

checkPatients();
