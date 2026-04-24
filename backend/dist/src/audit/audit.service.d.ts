import { Repository } from 'typeorm';
import { AuditLogEntity } from '../entities';
export declare class AuditService {
    private auditRepository;
    constructor(auditRepository: Repository<AuditLogEntity>);
    registrar(usuario: string, accion: string, entidad: string, entidadId: string, cambios?: any, ip?: string): Promise<void>;
    obtenerPorUsuario(usuario: string, limite?: number): Promise<AuditLogEntity[]>;
    obtenerPorEntidad(entidad: string, entidadId: string): Promise<AuditLogEntity[]>;
    obtenerTodos(limite?: number): Promise<AuditLogEntity[]>;
}
