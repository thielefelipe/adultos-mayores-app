import { AuditService } from './audit.service';
export declare class AuditController {
    private auditService;
    constructor(auditService: AuditService);
    obtenerTodos(limite?: number): Promise<import("../entities").AuditLogEntity[]>;
    obtenerPorUsuario(usuario: string, limite?: number): Promise<import("../entities").AuditLogEntity[]>;
    obtenerPorEntidad(entidad: string, id: string): Promise<import("../entities").AuditLogEntity[]>;
}
