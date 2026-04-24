import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { CrearAdminSeeder } from './src/seeders/crear-admin.seeder';

async function runSeed() {
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(CrearAdminSeeder);

  try {
    await seeder.seed();
    console.log('✅ Seed completado');
  } catch (error) {
    console.error('❌ Error en seed:', error);
  } finally {
    await app.close();
  }
}

runSeed();
