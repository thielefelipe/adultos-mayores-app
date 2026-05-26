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
          logging: false,
        };

        if (databaseUrl) {
          // Pasar la URL directamente a TypeORM (soporta postgres:// y postgresql://)
          const normalizedUrl = databaseUrl.replace(/^postgresql:\/\//, 'postgres://');
          console.log('✅ Usando DATABASE_URL');
          return {
            ...base,
            url: normalizedUrl,
            ssl: { rejectUnauthorized: false },
            extra: { ssl: { rejectUnauthorized: false } },
          };
        }

        // Fallback: variables individuales (desarrollo local)
        console.log('⚠️  Usando variables DB_* individuales');
        return {
          ...base,
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432', 10),
          username: process.env.DB_USERNAME || 'admin',
          password: process.env.DB_PASSWORD || 'admin',
          database: process.env.DB_NAME || 'centros_diurnos_db',
          ssl: isProduction ? { rejectUnauthorized: false } : false,
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
