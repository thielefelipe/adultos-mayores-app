import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContactoAndDireccionColumns1262800000000 implements MigrationInterface {
  name = 'AddContactoAndDireccionColumns1262800000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pacientes"
        ADD COLUMN IF NOT EXISTS "contacto_nombre" varchar(255),
        ADD COLUMN IF NOT EXISTS "contacto_telefono" varchar(20),
        ADD COLUMN IF NOT EXISTS "contacto_relacion" varchar(50),
        ADD COLUMN IF NOT EXISTS "sector" varchar(100),
        ADD COLUMN IF NOT EXISTS "direccion" varchar(255),
        ADD COLUMN IF NOT EXISTS "operador_id" varchar(255),
        ADD COLUMN IF NOT EXISTS "operador_nombre" varchar(255)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "pacientes"
        DROP COLUMN IF EXISTS "contacto_nombre",
        DROP COLUMN IF EXISTS "contacto_telefono",
        DROP COLUMN IF EXISTS "contacto_relacion",
        DROP COLUMN IF EXISTS "sector",
        DROP COLUMN IF EXISTS "direccion",
        DROP COLUMN IF EXISTS "operador_id",
        DROP COLUMN IF EXISTS "operador_nombre"
    `);
  }
}
