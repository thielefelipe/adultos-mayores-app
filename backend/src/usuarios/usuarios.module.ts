import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../entities';
import { AuditModule } from '../audit/audit.module';
import { UsuariosService } from './usuarios.service';
import { UsuariosController, UbicacionController } from './usuarios.controller';
import { UbicacionService } from '../services/ubicacion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity]),
    AuditModule,
  ],
  providers: [UsuariosService, UbicacionService],
  controllers: [UsuariosController, UbicacionController],
  exports: [UsuariosService],
})
export class UsuariosModule {}
