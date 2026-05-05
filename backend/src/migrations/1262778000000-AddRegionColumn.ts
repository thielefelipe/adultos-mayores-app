import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddRegionColumn1262778000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pacientes');

    if (table && !table.findColumnByName('region')) {
      await queryRunner.addColumn(
        'pacientes',
        new TableColumn({
          name: 'region',
          type: 'varchar',
          length: '100',
          isNullable: true,
          default: null,
        }),
      );
    }

    if (table && !table.findColumnByName('provincia')) {
      await queryRunner.addColumn(
        'pacientes',
        new TableColumn({
          name: 'provincia',
          type: 'varchar',
          length: '100',
          isNullable: true,
          default: null,
        }),
      );
    }

    if (table && !table.findColumnByName('operador_id')) {
      await queryRunner.addColumn(
        'pacientes',
        new TableColumn({
          name: 'operador_id',
          type: 'varchar',
          length: '255',
          isNullable: true,
          default: null,
        }),
      );
    }

    if (table && !table.findColumnByName('operador_nombre')) {
      await queryRunner.addColumn(
        'pacientes',
        new TableColumn({
          name: 'operador_nombre',
          type: 'varchar',
          length: '255',
          isNullable: true,
          default: null,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('pacientes');

    if (table && table.findColumnByName('operador_nome')) {
      await queryRunner.dropColumn('pacientes', 'operador_nome');
    }
    if (table && table.findColumnByName('operador_id')) {
      await queryRunner.dropColumn('pacientes', 'operador_id');
    }
    if (table && table.findColumnByName('provincia')) {
      await queryRunner.dropColumn('pacientes', 'provincia');
    }
    if (table && table.findColumnByName('region')) {
      await queryRunner.dropColumn('pacientes', 'region');
    }
  }
}
