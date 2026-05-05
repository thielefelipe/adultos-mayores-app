const pg = require('pg');

const client = new pg.Client({
  host: 'dpg-d7ltnllckfvc739crllg-a.oregon-postgres.render.com',
  port: 5432,
  database: 'centros_diurnos_db',
  user: 'admin',
  password: '5ZR21MkYYQN1ad8gqtqPJvVmpQAHydLa'
});

client.connect();

client.query('SELECT COUNT(*) FROM pacientes', (err, res) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Total de pacientes en BD:', res.rows[0].count);
    client.query('SELECT id, nombre, operador_id, creado FROM pacientes LIMIT 10', (err, res) => {
      if (err) {
        console.error('Error:', err);
      } else {
        console.log('\nÚltimos 10 pacientes:');
        console.table(res.rows);
      }
      client.end();
    });
  }
});
