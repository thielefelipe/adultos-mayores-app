import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  usuario: string;

  @Column({ type: 'varchar', length: 50 })
  accion: string; // 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', etc

  @Column({ type: 'varchar', length: 100 })
  entidad: string; // 'paciente', 'usuario', etc

  @Column({ type: 'varchar', length: 255, nullable: true })
  entidadId?: string;

  @Column({ type: 'text', nullable: true })
  cambios?: string; // JSON stringified

  @Column({ type: 'varchar', length: 50, nullable: true })
  ip?: string;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  userAgent?: string;
}
