export declare class AuditLogEntity {
    id: string;
    usuario: string;
    accion: string;
    entidad: string;
    entidadId?: string;
    cambios?: string;
    ip?: string;
    timestamp: Date;
    userAgent?: string;
}
