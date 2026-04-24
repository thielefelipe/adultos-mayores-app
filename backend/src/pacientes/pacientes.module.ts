import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteEntity } from '../entities';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteEntity]), AuditModule],
  providers: [PacientesService],
  controllers: [PacientesController],
  exports: [PacientesService],
})
export class PacientesModule {}
