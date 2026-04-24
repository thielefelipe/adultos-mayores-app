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
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'admin'),
        password: configService.get('DB_PASSWORD', 'admin'),
        database: configService.get('DB_NAME', 'centros_diurnos_db'),
        entities: [PacienteEntity, UsuarioEntity, AuditLogEntity, TokenRevocadoEntity],
        synchronize: true,
        logging: configService.get('NODE_ENV') === 'development',
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
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
  ],
  controllers: [AppController],
  providers: [AppService, CrearAdminSeeder],
})
export class AppModule {}
