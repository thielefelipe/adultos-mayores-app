import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestorePacienteJoseTorres1262780000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remove test patient if it exists
    await queryRunner.query(
      `DELETE FROM pacientes WHERE rut = '1111111' AND dv = '1'`,
    );
    console.log('✅ [Migration] Paciente de prueba José Torres eliminado si existía');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('🔄 [Migration] Removing restored paciente José Torres...');
    await queryRunner.query(
      `DELETE FROM pacientes WHERE rut = '1111111' AND dv = '1'`,
    );
    console.log('✅ [Migration] Paciente removed');
  }
}
