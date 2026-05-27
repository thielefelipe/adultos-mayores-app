import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddVGITercerEvaluacion1748400000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pacientes');
    if (!table) return;

    const columns = table.columns.map(c => c.name);

    // Columnas de la 3ª evaluación VGI (12 meses) que faltaban en el backend
    const newColumns = [
      { name: 'barthel3',  type: 'integer',  isNullable: true },
      { name: 'pfeiffer3', type: 'integer',  isNullable: true },
      { name: 'lawton3',   type: 'integer',  isNullable: true },
      { name: 'tug3',      type: 'numeric',  isNullable: true },
      { name: 'mini3',     type: 'integer',  isNullable: true },
      { name: 'yesa3',     type: 'integer',  isNullable: true },
      { name: 'eq3',       type: 'varchar',  isNullable: true },
    ];

    for (const col of newColumns) {
      if (!columns.includes(col.name)) {
        console.log(`🔄 [Migration] Adding column: ${col.name}`);
        await queryRunner.addColumn(
          'pacientes',
          new TableColumn({
            name: col.name,
            type: col.type,
            isNullable: col.isNullable,
          }),
        );
        console.log(`✅ [Migration] Column ${col.name} added`);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const cols = ['barthel3', 'pfeiffer3', 'lawton3', 'tug3', 'mini3', 'yesa3', 'eq3'];
    for (const name of cols) {
      await queryRunner.dropColumn('pacientes', name).catch(() => {/* ignore if not exists */});
    }
  }
}
