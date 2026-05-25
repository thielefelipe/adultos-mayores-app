import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TokenRevocadoInterceptor } from './auth/interceptors/token-revocado.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  // Acepta múltiples orígenes separados por coma en CORS_ORIGIN
  const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir sin origin (peticiones server-to-server, curl, etc.)
      if (!origin) return callback(null, true);
      if (corsOrigins.includes(origin)) return callback(null, true);
      // Permitir cualquier subdominio de vercel.app en desarrollo
      if (origin.endsWith('.vercel.app')) return callback(null, true);
      callback(new Error(`CORS no permitido para: ${origin}`));
    },
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  // Nota: El interceptor no se aplica globalmente aquí porque requiere inyectar AuthService
  // Se agregará a nivel de módulo en auth.module.ts si es necesario

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Servidor ejecutándose en http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
