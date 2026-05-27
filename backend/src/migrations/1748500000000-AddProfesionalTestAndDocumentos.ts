import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfesionalTestAndDocumentos1748500000000 implements MigrationInterface {
  name = 'AddProfesionalTestAndDocumentos1748500000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pacientes"
      ADD COLUMN IF NOT EXISTS "profesional_test" character varying(255),
      ADD COLUMN IF NOT EXISTS "documentos" text
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pacientes"
      DROP COLUMN IF EXISTS "profesional_test",
      DROP COLUMN IF EXISTS "documentos"
    `);
  }
}
