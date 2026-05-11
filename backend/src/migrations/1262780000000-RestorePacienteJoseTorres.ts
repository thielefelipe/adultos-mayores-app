import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestorePacienteJoseTorres1262780000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('🔄 [Migration] Restoring paciente José Torres...');

    // Check if José Torres already exists
    const existing = await queryRunner.query(
      `SELECT id FROM pacientes WHERE rut = '1111111' AND dv = '1' AND eliminado = false`,
    );

    if (existing.length > 0) {
      console.log('✅ [Migration] José Torres already exists, skipping');
      return;
    }

    // Insert José Torres
    await queryRunner.query(
      `INSERT INTO pacientes (id, rut, dv, nombre, comuna, "creadoPor", "fechaRegistro", eliminado)
       VALUES (gen_random_uuid(), '1111111', '1', 'José Torres', 'Contulmo', 'admin', CURRENT_TIMESTAMP, false)`,
    );

    console.log('✅ [Migration] José Torres restored successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('🔄 [Migration] Removing restored paciente José Torres...');
    await queryRunner.query(
      `DELETE FROM pacientes WHERE rut = '1111111' AND dv = '1'`,
    );
    console.log('✅ [Migration] Paciente removed');
  }
}
