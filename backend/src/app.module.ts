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
        const isProduction = configService.get('NODE_ENV') === 'production';
        const databaseUrl = configService.get('DATABASE_URL');

        let host = configService.get('DB_HOST', 'localhost');
        let port = parseInt(configService.get('DB_PORT', '5432'), 10);
        let username = configService.get('DB_USERNAME', 'admin');
        let password = configService.get('DB_PASSWORD', 'admin');
        let database = configService.get('DB_NAME', 'centros_diurnos_db');

        // Si existe DATABASE_URL (Render), parsearla
        if (databaseUrl && databaseUrl.startsWith('postgresql://')) {
          try {
            // postgresql://user:password@host:port/database
            const url = new URL(databaseUrl);
            host = url.hostname;
            port = parseInt(url.port || '5432', 10);
            username = url.username;
            password = url.password;
            database = url.pathname.substring(1); // Remover el / inicial
          } catch (e) {
            console.error('Error parsing DATABASE_URL:', e);
          }
        }

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [PacienteEntity, UsuarioEntity, AuditLogEntity, TokenRevocadoEntity],
          migrations: ['dist/migrations/*.js'],
          migrationsRun: true,
          synchronize: !isProduction,
          logging: !isProduction,
          ssl: isProduction ? { rejectUnauthorized: false } : false,
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
