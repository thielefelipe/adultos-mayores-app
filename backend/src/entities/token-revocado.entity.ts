import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

@Entity('tokens_revocados')
@Index(['token'])
@Index(['usuarioId'])
export class TokenRevocadoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'varchar', length: 36 })
  usuarioId: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @CreateDateColumn()
  revocado: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
