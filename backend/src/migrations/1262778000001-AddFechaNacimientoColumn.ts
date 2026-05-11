import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddFechaNacimientoColumn1262778000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'pacientes',
      new TableColumn({
        name: 'fecha_nacimiento',
        type: 'date',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('pacientes', 'fecha_nacimiento');
  }
}
