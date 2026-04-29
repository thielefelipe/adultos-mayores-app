const { createConnection } = require('typeorm');

const connection = {
  type: 'postgres',
  host: 'dpg-d7ltnllckfvc739crllg-a.oregon-postgres.render.com',
  port: 5432,
  username: 'admin',
  password: '5ZR21MkYYQN1ad8gqtqPJvVmpQAHydLa',
  database: 'centros_diurnos_db',
};

const pg = require('pg');
const client = new pg.Client(connection);

client.connect()
  .then(() => {
    console.log('Conectado a la base de datos');
    return client.query('SELECT COUNT(*) FROM pacientes WHERE eliminado = false');
  })
  .then(res => {
    console.log('Pacientes registrados:', res.rows[0].count);
    return client.query('SELECT id, nombre, rut, f_ingreso, "creadoPor" FROM pacientes WHERE eliminado = false ORDER BY "fechaRegistro" DESC LIMIT 5');
  })
  .then(res => {
    console.log('\nÚltimos 5 pacientes:');
    res.rows.forEach(row => {
      console.log(`- ${row.nombre} (RUT: ${row.rut}) - Agregado por: ${row.creadoPor} - Fecha: ${row.f_ingreso}`);
    });
  })
  .catch(err => console.error('Error:', err.message))
  .finally(() => client.end());
