import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuditLogsTable1262770000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if table already exists to avoid errors
    const table = await queryRunner.getTable('audit_logs');

    if (!table) {
      console.log('🔄 [Migration] Creating audit_logs table...');

      await queryRunner.createTable(
        new Table({
          name: 'audit_logs',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid',
              default: 'gen_random_uuid()',
            },
            {
              name: 'usuario',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'accion',
              type: 'varchar',
              length: '50',
              isNullable: false,
            },
            {
              name: 'entidad',
              type: 'varchar',
              length: '100',
              isNullable: false,
            },
            {
              name: 'entidadId',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'cambios',
              type: 'text',
              isNullable: true,
            },
            {
              name: 'ip',
              type: 'varchar',
              length: '50',
              isNullable: true,
            },
            {
              name: 'timestamp',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              isNullable: false,
            },
            {
              name: 'userAgent',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
          ],
          indices: [
            {
              name: 'idx_usuario',
              columnNames: ['usuario'],
            },
            {
              name: 'idx_accion',
              columnNames: ['accion'],
            },
            {
              name: 'idx_entidad',
              columnNames: ['entidad'],
            },
            {
              name: 'idx_timestamp',
              columnNames: ['timestamp'],
            },
          ],
        }),
      );

      console.log('✅ [Migration] audit_logs table created successfully');
    } else {
      console.log('✅ [Migration] audit_logs table already exists, skipping creation');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('audit_logs');

    if (table) {
      console.log('🔄 [Migration] Dropping audit_logs table...');
      await queryRunner.dropTable('audit_logs');
      console.log('✅ [Migration] audit_logs table dropped successfully');
    }
  }
}
