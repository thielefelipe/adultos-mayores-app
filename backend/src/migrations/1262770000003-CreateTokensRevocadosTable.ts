import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTokensRevocadosTable1262770000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if table already exists to avoid errors
    const table = await queryRunner.getTable('tokens_revocados');

    if (!table) {
      console.log('🔄 [Migration] Creating tokens_revocados table...');

      await queryRunner.createTable(
        new Table({
          name: 'tokens_revocados',
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
              name: 'token',
              type: 'text',
              isNullable: false,
            },
            {
              name: 'usuarioId',
              type: 'varchar',
              length: '36',
              isNullable: false,
            },
            {
              name: 'username',
              type: 'varchar',
              length: '255',
              isNullable: false,
            },
            {
              name: 'revocado',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
              isNullable: false,
            },
            {
              name: 'expiresAt',
              type: 'timestamp',
              isNullable: false,
            },
          ],
          indices: [
            {
              name: 'idx_token',
              columnNames: ['token'],
              isFulltext: false,
            },
            {
              name: 'idx_usuarioId',
              columnNames: ['usuarioId'],
            },
            {
              name: 'idx_expiresAt',
              columnNames: ['expiresAt'],
            },
          ],
        }),
      );

      console.log('✅ [Migration] tokens_revocados table created successfully');
    } else {
      console.log('✅ [Migration] tokens_revocados table already exists, skipping creation');
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('tokens_revocados');

    if (table) {
      console.log('🔄 [Migration] Dropping tokens_revocados table...');
      await queryRunner.dropTable('tokens_revocados');
      console.log('✅ [Migration] tokens_revocados table dropped successfully');
    }
  }
}
