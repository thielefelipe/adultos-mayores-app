import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PacienteEntity } from './entities';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectRepository(PacienteEntity)
    private pacienteRepository: Repository<PacienteEntity>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    console.log('🔍 [APP] Iniciando verificación de esquema de base de datos...');
    console.log('🔍 [APP] NODE_ENV:', process.env.NODE_ENV);
    let queryRunner;
    try {
      // Verificar si la columna fecha_nacimiento existe
      queryRunner = this.dataSource.createQueryRunner();
      console.log('🔍 [APP] QueryRunner creado, conectando a la base de datos...');

      await queryRunner.connect();
      console.log('✅ [APP] Conectado a la base de datos exitosamente');

      console.log('🔍 [APP] Verificando si la tabla "pacientes" existe...');
      const tableExists = await queryRunner.hasTable('pacientes');
      if (!tableExists) {
        console.log('⚠️ [APP] La tabla "pacientes" no existe aún (probablemente será creada por TypeORM)');
        await queryRunner.release();
        return;
      }

      console.log('✅ [APP] Tabla "pacientes" encontrada. Verificando columnas...');

      const hasColumn = await queryRunner.hasColumn('pacientes', 'fecha_nacimiento');

      if (!hasColumn) {
        console.log('⚠️ [APP] Columna fecha_nacimiento NO existe. Agregando...');
        try {
          await queryRunner.query(
            `ALTER TABLE "pacientes" ADD COLUMN "fecha_nacimiento" date`
          );
          console.log('✅ [APP] Columna fecha_nacimiento agregada exitosamente');
        } catch (alterError) {
          console.error('❌ [APP] Error al agregar columna:', alterError.message);
          throw alterError;
        }
      } else {
        console.log('✅ [APP] Columna fecha_nacimiento ya existe en la tabla');
      }

      console.log('✅ [APP] Verificación de esquema completada exitosamente');
    } catch (error) {
      console.error('❌ [APP] Error durante verificación de esquema:', error.message);
      console.error('❌ [APP] Stack:', error.stack);
    } finally {
      if (queryRunner && queryRunner.isConnected) {
        console.log('🔍 [APP] Liberando QueryRunner...');
        await queryRunner.release();
        console.log('✅ [APP] QueryRunner liberado');
      }
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
