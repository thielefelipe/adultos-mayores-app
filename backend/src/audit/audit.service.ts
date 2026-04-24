import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogEntity } from '../entities';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLogEntity)
    private auditRepository: Repository<AuditLogEntity>,
  ) {}

  async registrar(
    usuario: string,
    accion: string,
    entidad: string,
    entidadId: string,
    cambios?: any,
    ip?: string,
  ) {
    const log = this.auditRepository.create({
      usuario,
      accion,
      entidad,
      entidadId,
      cambios: cambios ? JSON.stringify(cambios) : undefined,
      ip,
    });

    await this.auditRepository.save(log);
  }

  async obtenerPorUsuario(usuario: string, limite: number = 100) {
    return this.auditRepository
      .find({
        where: { usuario },
        order: { timestamp: 'DESC' },
        take: limite,
      });
  }

  async obtenerPorEntidad(entidad: string, entidadId: string) {
    return this.auditRepository
      .find({
        where: { entidad, entidadId },
        order: { timestamp: 'DESC' },
      });
  }

  async obtenerTodos(limite: number = 500) {
    return this.auditRepository
      .find({
        order: { timestamp: 'DESC' },
        take: limite,
      });
  }
}
