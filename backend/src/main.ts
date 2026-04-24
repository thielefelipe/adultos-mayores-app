import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TokenRevocadoInterceptor } from './auth/interceptors/token-revocado.interceptor';
import { CrearAdminSeeder } from './seeders/crear-admin.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Servidor ejecutándose en http://localhost:${port}`);

  // Auto-initialize admin user on startup
  const seeder = app.get(CrearAdminSeeder);
  await seeder.seed().catch((err) => console.error('Seed error:', err));
}
bootstrap();
