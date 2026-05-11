import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePacientesTable1262770000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pacientes');

    // Drop table if it exists and is incomplete
    if (table) {
      const columns = table.columns.map(c => c.name);
      const hasRequiredColumns =
        columns.includes('rut') &&
        columns.includes('nombre') &&
        columns.includes('comuna') &&
        columns.includes('creadoPor');

      if (!hasRequiredColumns) {
        console.log('⚠️ [Migration] pacientes table is incomplete, dropping...');
        await queryRunner.dropTable('pacientes', true);
      } else {
        console.log('✅ [Migration] pacientes table already exists and is complete');
        return;
      }
    }

    console.log('🔄 [Migration] Creating pacientes table...');

    await queryRunner.createTable(
      new Table({
        name: 'pacientes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'gen_random_uuid()',
          },
          { name: 'rut', type: 'varchar', length: '9', isNullable: false },
          { name: 'dv', type: 'varchar', length: '1', isNullable: false },
          { name: 'nombre', type: 'varchar', length: '255', isNullable: false },
          { name: 'region', type: 'varchar', length: '100', isNullable: true },
          { name: 'provincia', type: 'varchar', length: '100', isNullable: true },
          { name: 'sexo', type: 'varchar', length: '20', isNullable: true },
          { name: 'fecha_nacimiento', type: 'date', isNullable: true },
          { name: 'edad', type: 'integer', isNullable: true },
          { name: 'telefono', type: 'varchar', length: '20', isNullable: true },
          { name: 'escolaridad', type: 'varchar', length: '50', isNullable: true },
          { name: 'pueblo', type: 'varchar', length: '50', isNullable: true },
          { name: 'rsh', type: 'varchar', length: '50', isNullable: true },
          { name: 'anio', type: 'integer', isNullable: true },
          { name: 'semestre', type: 'integer', isNullable: true },
          { name: 'f_ingreso', type: 'date', isNullable: true },
          { name: 'f_consentimiento', type: 'date', isNullable: true },
          { name: 'f_egreso', type: 'date', isNullable: true },
          { name: 'naturaleza', type: 'varchar', length: '255', isNullable: true },
          { name: 'comuna', type: 'varchar', length: '100', isNullable: false },
          { name: 'rural', type: 'varchar', length: '20', isNullable: true },
          { name: 'dependencia', type: 'varchar', length: '100', isNullable: true },
          { name: 'enfermedades', type: 'text', isNullable: true },
          { name: 'pai', type: 'text', isNullable: true },
          { name: 'obj_pai', type: 'integer', isNullable: true },
          { name: 'obj_alc', type: 'integer', isNullable: true },
          { name: 'talleres', type: 'text', isNullable: true },
          { name: 'barthel1', type: 'integer', isNullable: true },
          { name: 'pfeiffer1', type: 'integer', isNullable: true },
          { name: 'lawton1', type: 'integer', isNullable: true },
          { name: 'tug1', type: 'numeric', precision: 5, scale: 2, isNullable: true },
          { name: 'mini1', type: 'integer', isNullable: true },
          { name: 'yesa1', type: 'integer', isNullable: true },
          { name: 'eq1', type: 'varchar', length: '50', isNullable: true },
          { name: 'barthel2', type: 'integer', isNullable: true },
          { name: 'pfeiffer2', type: 'integer', isNullable: true },
          { name: 'lawton2', type: 'integer', isNullable: true },
          { name: 'tug2', type: 'numeric', precision: 5, scale: 2, isNullable: true },
          { name: 'mini2', type: 'integer', isNullable: true },
          { name: 'yesa2', type: 'integer', isNullable: true },
          { name: 'eq2', type: 'varchar', length: '50', isNullable: true },
          { name: 't1_fecha', type: 'date', isNullable: true },
          { name: 't1_punt', type: 'integer', isNullable: true },
          { name: 't1_barthel', type: 'integer', isNullable: true },
          { name: 't1_mini', type: 'integer', isNullable: true },
          { name: 't2_fecha', type: 'date', isNullable: true },
          { name: 't2_punt', type: 'integer', isNullable: true },
          { name: 't2_barthel', type: 'integer', isNullable: true },
          { name: 't2_mini', type: 'integer', isNullable: true },
          { name: 't3_fecha', type: 'date', isNullable: true },
          { name: 't3_punt', type: 'integer', isNullable: true },
          { name: 't3_barthel', type: 'integer', isNullable: true },
          { name: 't3_mini', type: 'integer', isNullable: true },
          { name: 't4_fecha', type: 'date', isNullable: true },
          { name: 't4_punt', type: 'integer', isNullable: true },
          { name: 't4_barthel', type: 'integer', isNullable: true },
          { name: 't4_mini', type: 'integer', isNullable: true },
          { name: 'notas', type: 'text', isNullable: true },
          { name: 'plan', type: 'text', isNullable: true },
          { name: 'operador_id', type: 'varchar', length: '255', isNullable: true },
          { name: 'operador_nombre', type: 'varchar', length: '255', isNullable: true },
          { name: 'creadoPor', type: 'varchar', length: '255', isNullable: false },
          {
            name: 'fechaRegistro',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          { name: 'modificadoPor', type: 'varchar', length: '255', isNullable: true },
          {
            name: 'modificadoEn',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            isNullable: true,
          },
          { name: 'eliminado', type: 'boolean', default: false, isNullable: false },
          { name: 'fechaEliminacion', type: 'timestamp', isNullable: true },
        ],
        indices: [
          { name: 'idx_rut', columnNames: ['rut', 'dv'], isUnique: true },
          { name: 'idx_eliminado', columnNames: ['eliminado'] },
        ],
      }),
    );

    console.log('✅ [Migration] pacientes table created successfully');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pacientes');
    if (table) {
      console.log('🔄 [Migration] Dropping pacientes table...');
      await queryRunner.dropTable('pacientes');
      console.log('✅ [Migration] pacientes table dropped successfully');
    }
  }
}
