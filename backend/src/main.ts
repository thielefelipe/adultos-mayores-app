import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TokenRevocadoInterceptor } from './auth/interceptors/token-revocado.interceptor';

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

  // Nota: El interceptor no se aplica globalmente aquí porque requiere inyectar AuthService
  // Se agregará a nivel de módulo en auth.module.ts si es necesario

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Servidor ejecutándose en http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
