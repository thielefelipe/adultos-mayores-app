const { createConnection } = require('typeorm');
const path = require('path');

async function fixSchema() {
  try {
    const connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'centros_diurnos_db',
      dropSchema: false,
      logging: true,
    });

    console.log('✅ Conectado a la base de datos');

    // Ejecutar SQL para agregar columnas faltantes
    const queries = [
      `ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS region VARCHAR(100);`,
      `ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS provincia VARCHAR(100);`,
      `ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS operador_id VARCHAR(255);`,
      `ALTER TABLE pacientes ADD COLUMN IF NOT EXISTS operador_nombre VARCHAR(255);`,
    ];

    for (const query of queries) {
      try {
        await connection.query(query);
        console.log(`✅ Ejecutado: ${query.substring(0, 60)}...`);
      } catch (err) {
        if (err.message.includes('already exists')) {
          console.log(`⚠️ La columna ya existe: ${query.substring(0, 60)}...`);
        } else {
          throw err;
        }
      }
    }

    console.log('✅ Schema actualizado');
    await connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixSchema();
