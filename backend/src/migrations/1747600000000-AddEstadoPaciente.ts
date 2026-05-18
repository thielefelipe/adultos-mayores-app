import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEstadoPaciente1747600000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pacientes
        ADD COLUMN IF NOT EXISTS estado VARCHAR(30) NOT NULL DEFAULT 'activo',
        ADD COLUMN IF NOT EXISTS "motivoEliminacion" TEXT,
        ADD COLUMN IF NOT EXISTS "fechaAlta" TIMESTAMP
    `);
    // Sincronizar estado con el campo eliminado existente
    await queryRunner.query(`
      UPDATE pacientes SET estado = 'pendiente_eliminacion' WHERE eliminado = true
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pacientes
        DROP COLUMN IF EXISTS estado,
        DROP COLUMN IF EXISTS "motivoEliminacion",
        DROP COLUMN IF EXISTS "fechaAlta"
    `);
  }
}
