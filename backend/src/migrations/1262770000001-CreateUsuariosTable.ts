import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsuariosTable1262770000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if table already exists to avoid errors
    const table = await queryRunner.getTable('usuarios');

    if (!table) {
      console.log('🔄 [Migration] Creating usuarios table...');

      await queryRunner.createTable(
        new Table({
          name: 'usuarios',
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
              name: 'username',
              type: 'varchar',
              length: '50',
              isNullable: false,
              isUnique: true,
            },
            {
              name: 'rut',
              type: 'varchar',
              length: '12',
              isNullable: true,
              isUnique: true,
            },
            {
              name: 'nombre',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'password',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'rol',
              type: 'varchar',
              length: '20',
              isNullable: false,
            },
            {
              name: 'email',
              type: 'varchar',
              length: '255',
              isNullable: true,
            },
            {
              name: 'telefono',
              type: 'varchar',
              length: '20',
              isNullable: true,
            },
            {
              name: 'region',
              type: 'varchar',
              length: '100',
              isNullable: true,
            },
            {
              name: 'provincia',
              type: 'varchar',
              length: '100',
              isNullable: true,
            },
            {
              name: 'comuna',
              type: 'varchar',
              length: '100',
              isNullable: true,
            },
            {
              name: 'activo',
              type: 'boolean',
              default: true,
              isNullable: false,
            },
            {
              name: 'creado',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              isNullable: false,
            },
            {
              name: 'ultimoAcceso',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'actualizado',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              onUpdate: 'CURRENT_TIMESTAMP',
              isNullable: false,
            },
          ],
          indices: [
            {
              name: 'idx_username',
              columnNames: ['username'],
              isUnique: true,
            },
            {
              name: 'idx_activo',
              columnNames: ['activo'],
            },
          ],
        }),
      );

      console.log('✅ [Migration] usuarios table created successfully');
    } else {
      console.log('✅ [Migration] usuarios table already exists, skipping creation');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('usuarios');

    if (table) {
      console.log('🔄 [Migration] Dropping usuarios table...');
      await queryRunner.dropTable('usuarios');
      console.log('✅ [Migration] usuarios table dropped successfully');
    }
  }
}
