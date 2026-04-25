import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 12, nullable: true, unique: true })
  rut?: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  password: string; // Hashed with bcrypt

  @Column({ type: 'varchar', length: 20 })
  rol: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  region?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  provincia?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  comuna?: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn()
  creado: Date;

  @Column({ type: 'timestamp', nullable: true })
  ultimoAcceso?: Date;

  @UpdateDateColumn()
  actualizado: Date;
}
