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

        let config: any = {
          type: 'postgres',
          entities: [PacienteEntity, UsuarioEntity, AuditLogEntity, TokenRevocadoEntity],
          migrations: ['dist/migrations/*.js'],
          migrationsRun: true,
          synchronize: !isProduction,
          logging: !isProduction,
          ssl: isProduction ? { rejectUnauthorized: false } : false,
        };

        // Si existe DATABASE_URL (Render), parsearla
        if (databaseUrl && databaseUrl.startsWith('postgresql://')) {
          try {
            const url = new URL(databaseUrl);
            config.host = url.hostname;
            config.port = parseInt(url.port || '5432', 10);
            config.username = url.username;
            config.password = url.password;
            config.database = url.pathname.substring(1);
            console.log('Usando DATABASE_URL parseada:', {
              host: config.host,
              port: config.port,
              database: config.database,
            });
          } catch (e) {
            console.error('Error parsing DATABASE_URL:', e);
            // Fallback a variables individuales
            config.host = process.env.DB_HOST || 'localhost';
            config.port = parseInt(process.env.DB_PORT || '5432', 10);
            config.username = process.env.DB_USERNAME || 'admin';
            config.password = process.env.DB_PASSWORD || 'admin';
            config.database = process.env.DB_NAME || 'centros_diurnos_db';
          }
        } else {
          // Usar variables individuales
          config.host = process.env.DB_HOST || 'localhost';
          config.port = parseInt(process.env.DB_PORT || '5432', 10);
          config.username = process.env.DB_USERNAME || 'admin';
          config.password = process.env.DB_PASSWORD || 'admin';
          config.database = process.env.DB_NAME || 'centros_diurnos_db';
        }

        return config;
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
