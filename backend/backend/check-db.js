const { Client } = require('pg');

const client = new Client({
  host: 'dpg-d7ltnllckfvc739crllg-a.oregon-postgres.render.com',
  port: 5432,
  user: 'admin',
  password: '5ZR21MkYYQN1ad8gqtqPJvVmpQAHydLa',
  database: 'centros_diurnos_db',
  ssl: { rejectUnauthorized: false },
});

async function checkDatabase() {
  try {
    console.log('🔄 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database');

    // Check if pacientes table exists
    const res = await client.query(
      "SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'pacientes') as exists",
    );
    console.log('📋 pacientes table exists:', res.rows[0].exists);

    if (res.rows[0].exists) {
      // Get column count
      const colRes = await client.query(
        "SELECT COUNT(*) as count FROM information_schema.columns WHERE table_name = 'pacientes'",
      );
      console.log('📊 pacientes table has', colRes.rows[0].count, 'columns');

      // List all columns
      const columnsRes = await client.query(
        "SELECT column_name FROM information_schema.columns WHERE table_name = 'pacientes' ORDER BY ordinal_position",
      );
      console.log('📋 Columns:', columnsRes.rows.map(r => r.column_name));

      // Count records
      const countRes = await client.query('SELECT COUNT(*) as count FROM pacientes WHERE eliminado = false');
      console.log('📊 Active pacientes:', countRes.rows[0].count);
    } else {
      console.log('❌ pacientes table does not exist in database');
    }

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();
