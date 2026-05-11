require('dotenv').config();
const { DataSource } = require('typeorm');
const path = require('path');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'centros_diurnos_db',
  entities: ['dist/src/entities/**/*.js'],
  migrations: ['dist/src/migrations/**/*.js'],
  migrationsRun: false,
  synchronize: false,
  logging: false,
  ssl: false,
});

async function runMigrations() {
  try {
    console.log('🔄 Initializing database connection...');
    await AppDataSource.initialize();
    console.log('✅ Connected to database');

    console.log('🔄 Running migrations...');
    await AppDataSource.runMigrations();
    console.log('✅ Migrations completed successfully');

    // Check if pacientes table exists
    console.log('📋 Checking pacientes table...');
    const queryRunner = AppDataSource.createQueryRunner();
    const table = await queryRunner.getTable('pacientes');

    if (table) {
      console.log('✅ pacientes table exists with columns:', table.columns.map(c => c.name));

      // Count records
      const result = await queryRunner.query('SELECT COUNT(*) as count FROM pacientes WHERE eliminado = false');
      console.log('📊 Total active pacientes:', result[0].count);
    } else {
      console.log('❌ pacientes table does not exist');
    }

    await queryRunner.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

runMigrations();
