import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('pacientes')
export class PacienteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ── Datos Personales ──
  @Column({ type: 'varchar', length: 9 })
  rut: string;

  @Column({ type: 'varchar', length: 1 })
  dv: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  sexo?: string;

  @Column({ type: 'integer', nullable: true })
  edad?: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  escolaridad?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pueblo?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  rsh?: string;

  // ── Período (Año y Semestre) ──
  @Column({ type: 'integer', nullable: true })
  anio?: number;

  @Column({ type: 'integer', nullable: true })
  semestre?: number; // 1 o 2

  // ── Atención/Admisión ──
  @Column({ type: 'date', nullable: true })
  f_ingreso?: Date;

  @Column({ type: 'date', nullable: true })
  f_consentimiento?: Date;

  @Column({ type: 'date', nullable: true })
  f_egreso?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  naturaleza?: string;

  @Column({ type: 'varchar', length: 100 })
  comuna: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  rural?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  dependencia?: string;

  @Column({ type: 'text', nullable: true })
  enfermedades?: string;

  @Column({ type: 'text', nullable: true })
  pai?: string;

  @Column({ type: 'integer', nullable: true })
  obj_pai?: number;

  @Column({ type: 'integer', nullable: true })
  obj_alc?: number;

  @Column({ type: 'text', nullable: true })
  talleres?: string;

  // ── Instrumentos VGI (1ª evaluación) ──
  @Column({ type: 'integer', nullable: true })
  barthel1?: number;

  @Column({ type: 'integer', nullable: true })
  pfeiffer1?: number;

  @Column({ type: 'integer', nullable: true })
  lawton1?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  tug1?: number;

  @Column({ type: 'integer', nullable: true })
  mini1?: number;

  @Column({ type: 'integer', nullable: true })
  yesa1?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  eq1?: string;

  // ── Instrumentos VGI (2ª evaluación) ──
  @Column({ type: 'integer', nullable: true })
  barthel2?: number;

  @Column({ type: 'integer', nullable: true })
  pfeiffer2?: number;

  @Column({ type: 'integer', nullable: true })
  lawton2?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  tug2?: number;

  @Column({ type: 'integer', nullable: true })
  mini2?: number;

  @Column({ type: 'integer', nullable: true })
  yesa2?: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  eq2?: string;

  // ── Seguimiento Trimestral ──
  @Column({ type: 'date', nullable: true })
  t1_fecha?: Date;

  @Column({ type: 'integer', nullable: true })
  t1_punt?: number;

  @Column({ type: 'integer', nullable: true })
  t1_barthel?: number;

  @Column({ type: 'integer', nullable: true })
  t1_mini?: number;

  @Column({ type: 'date', nullable: true })
  t2_fecha?: Date;

  @Column({ type: 'integer', nullable: true })
  t2_punt?: number;

  @Column({ type: 'integer', nullable: true })
  t2_barthel?: number;

  @Column({ type: 'integer', nullable: true })
  t2_mini?: number;

  @Column({ type: 'date', nullable: true })
  t3_fecha?: Date;

  @Column({ type: 'integer', nullable: true })
  t3_punt?: number;

  @Column({ type: 'integer', nullable: true })
  t3_barthel?: number;

  @Column({ type: 'integer', nullable: true })
  t3_mini?: number;

  @Column({ type: 'date', nullable: true })
  t4_fecha?: Date;

  @Column({ type: 'integer', nullable: true })
  t4_punt?: number;

  @Column({ type: 'integer', nullable: true })
  t4_barthel?: number;

  @Column({ type: 'integer', nullable: true })
  t4_mini?: number;

  // ── Notas y Plan ──
  @Column({ type: 'text', nullable: true })
  notas?: string;

  @Column({ type: 'text', nullable: true })
  plan?: string;

  // ── Auditoría ──
  @Column({ type: 'varchar', length: 255 })
  creadoPor: string;

  @CreateDateColumn()
  fechaRegistro: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  modificadoPor?: string;

  @UpdateDateColumn()
  modificadoEn?: Date;

  @Column({ type: 'boolean', default: false })
  eliminado: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fechaEliminacion?: Date;
}
