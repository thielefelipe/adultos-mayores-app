import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PacienteEntity, UsuarioEntity, AuditLogEntity, TokenRevocadoEntity } from './entities';
import { AuditModule } from './audit/audit.module';
import { AuthModule } from './auth/auth.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UbicacionModule } from './ubicacion/ubicacion.module';
import { CrearAdminSeeder } from './seeders/crear-admin.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = process.env.NODE_ENV === 'production';
        const databaseUrl = process.env.DATABASE_URL;

        const base: any = {
          type: 'postgres',
          entities: [PacienteEntity, UsuarioEntity, AuditLogEntity, TokenRevocadoEntity],
          migrations: ['dist/migrations/*.js'],
          migrationsRun: true,
          synchronize: false,
          logging: ['error', 'warn'],
        };

        if (databaseUrl) {
          // Parsear manualmente la URL para máxima compatibilidad con TypeORM
          try {
            const u = new URL(databaseUrl);
            const host = u.hostname;
            const port = parseInt(u.port || '5432', 10);
            const username = decodeURIComponent(u.username);
            const password = decodeURIComponent(u.password);
            const database = u.pathname.replace(/^\//, '').split('?')[0];
            console.log(`✅ DATABASE_URL → ${host}/${database}`);
            return {
              ...base,
              host,
              port,
              username,
              password,
              database,
              ssl: { rejectUnauthorized: false },
              extra: { ssl: { rejectUnauthorized: false } },
            };
          } catch (e: any) {
            console.error('❌ Error parseando DATABASE_URL:', (e as Error).message);
          }
        }

        // Fallback: variables individuales (desarrollo local)
        const dbHost = process.env.DB_HOST || 'localhost';
        // Si DB_HOST es una URL completa, parsearla también
        if (dbHost.startsWith('postgresql://') || dbHost.startsWith('postgres://')) {
          try {
            const u = new URL(dbHost);
            console.log(`⚠️  Usando DB_HOST como URL → ${u.hostname}`);
            return {
              ...base,
              host: u.hostname,
              port: parseInt(u.port || '5432', 10),
              username: decodeURIComponent(u.username),
              password: decodeURIComponent(u.password),
              database: u.pathname.replace(/^\//, '').split('?')[0],
              ssl: isProduction ? { rejectUnauthorized: false } : false,
              extra: isProduction ? { ssl: { rejectUnauthorized: false } } : {},
              synchronize: !isProduction,
              logging: !isProduction,
            };
          } catch(e: any) { console.error('Error parseando DB_HOST:', (e as Error).message); }
        }
        console.log('⚠️  Usando variables DB_* individuales');
        return {
          ...base,
          host: dbHost,
          port: parseInt(process.env.DB_PORT || '5432', 10),
          username: process.env.DB_USERNAME || 'admin',
          password: process.env.DB_PASSWORD || 'admin',
          database: process.env.DB_NAME || 'centros_diurnos_db',
          ssl: isProduction ? { rejectUnauthorized: false } : false,
          extra: isProduction ? { ssl: { rejectUnauthorized: false } } : {},
          synchronize: !isProduction,
          logging: !isProduction,
        };
      },
    }),
    TypeOrmModule.forFeature([UsuarioEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'dev-secret-key'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRE', '24h'),
        },
      }),
      global: true,
    }),
    AuditModule,
    AuthModule,
    PacientesModule,
    UsuariosModule,
    UbicacionModule,
  ],
  controllers: [AppController],
  providers: [AppService, CrearAdminSeeder],
})
export class AppModule {}
