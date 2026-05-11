import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFechaNacimientoColumn1262778000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if column already exists to avoid duplicate column errors
    const hasColumn = await queryRunner.hasColumn('pacientes', 'fecha_nacimiento');

    if (!hasColumn) {
      console.log('🔄 [Migration] Adding fecha_nacimiento column to pacientes table...');
      await queryRunner.addColumn(
        'pacientes',
        new TableColumn({
          name: 'fecha_nacimiento',
          type: 'date',
          isNullable: true,
        }),
      );
      console.log('✅ [Migration] fecha_nacimiento column added successfully');
    } else {
      console.log('✅ [Migration] fecha_nacimiento column already exists, skipping');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasColumn = await queryRunner.hasColumn('pacientes', 'fecha_nacimiento');

    if (hasColumn) {
      console.log('🔄 [Migration] Removing fecha_nacimiento column from pacientes table...');
      await queryRunner.dropColumn('pacientes', 'fecha_nacimiento');
      console.log('✅ [Migration] fecha_nacimiento column removed successfully');
    } else {
      console.log('✅ [Migration] fecha_nacimiento column does not exist, skipping removal');
    }
  }
}
