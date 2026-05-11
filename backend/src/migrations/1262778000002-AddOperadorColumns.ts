import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddOperadorColumns1262778000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasOperadorId = await queryRunner.hasColumn('pacientes', 'operador_id');
    if (!hasOperadorId) {
      console.log('🔄 [Migration] Adding operador_id column to pacientes table...');
      await queryRunner.addColumn(
        'pacientes',
        new TableColumn({
          name: 'operador_id',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
      );
      console.log('✅ [Migration] operador_id column added successfully');
    } else {
      console.log('✅ [Migration] operador_id column already exists, skipping');
    }

    const hasOperadorNombre = await queryRunner.hasColumn('pacientes', 'operador_nombre');
    if (!hasOperadorNombre) {
      console.log('🔄 [Migration] Adding operador_nombre column to pacientes table...');
      await queryRunner.addColumn(
        'pacientes',
        new TableColumn({
          name: 'operador_nombre',
          type: 'varchar',
          length: '255',
          isNullable: true,
        }),
      );
      console.log('✅ [Migration] operador_nombre column added successfully');
    } else {
      console.log('✅ [Migration] operador_nombre column already exists, skipping');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasOperadorId = await queryRunner.hasColumn('pacientes', 'operador_id');
    if (hasOperadorId) {
      await queryRunner.dropColumn('pacientes', 'operador_id');
    }

    const hasOperadorNombre = await queryRunner.hasColumn('pacientes', 'operador_nombre');
    if (hasOperadorNombre) {
      await queryRunner.dropColumn('pacientes', 'operador_nombre');
    }
  }
}
