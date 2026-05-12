import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMissingColumns1262790000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pacientes');
    if (!table) return;

    const columns = table.columns.map(c => c.name);

    // Lista de columnas que deben existir según PacienteEntity
    const requiredColumns = [
      { name: 'anio', type: 'integer', isNullable: true },
      { name: 'semestre', type: 'integer', isNullable: true },
      { name: 'barthel1', type: 'integer', isNullable: true },
      { name: 'pfeiffer1', type: 'integer', isNullable: true },
      { name: 'lawton1', type: 'integer', isNullable: true },
      { name: 'tug1', type: 'numeric', isNullable: true },
      { name: 'mini1', type: 'integer', isNullable: true },
      { name: 'yesa1', type: 'integer', isNullable: true },
      { name: 'eq1', type: 'varchar', isNullable: true },
      { name: 'barthel2', type: 'integer', isNullable: true },
      { name: 'pfeiffer2', type: 'integer', isNullable: true },
      { name: 'lawton2', type: 'integer', isNullable: true },
      { name: 'tug2', type: 'numeric', isNullable: true },
      { name: 'mini2', type: 'integer', isNullable: true },
      { name: 'yesa2', type: 'integer', isNullable: true },
      { name: 'eq2', type: 'varchar', isNullable: true },
      { name: 'creadoPor', type: 'varchar', isNullable: true },
      { name: 'fechaRegistro', type: 'timestamp', isNullable: true },
      { name: 'modificadoPor', type: 'varchar', isNullable: true },
      { name: 'modificadoEn', type: 'timestamp', isNullable: true },
      { name: 'eliminado', type: 'boolean', isNullable: true, default: false },
    ];

    for (const col of requiredColumns) {
      if (!columns.includes(col.name)) {
        console.log(`🔄 [Migration] Adding missing column: ${col.name}`);
        const newCol = new TableColumn({
          name: col.name,
          type: col.type,
          isNullable: col.isNullable ?? true,
          default: col.default,
        });
        await queryRunner.addColumn('pacientes', newCol);
        console.log(`✅ [Migration] Column ${col.name} added`);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op: no eliminar columnas en rollback
  }
}
