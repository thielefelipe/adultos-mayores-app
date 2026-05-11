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
      // Esperar a que la base de datos esté lista (puede tomar un momento en desarrollo)
      queryRunner = this.dataSource.createQueryRunner();
      console.log('🔍 [APP] QueryRunner creado, conectando a la base de datos...');

      await queryRunner.connect();
      console.log('✅ [APP] Conectado a la base de datos exitosamente');

      // Pequeña espera para asegurar que las tablas están listas
      await new Promise(resolve => setTimeout(resolve, 500));

      console.log('🔍 [APP] Verificando si la tabla "pacientes" existe...');
      let tableExists = false;
      try {
        tableExists = await queryRunner.hasTable('pacientes');
      } catch (tableCheckError) {
        console.warn('⚠️ [APP] Error verificando tabla:', tableCheckError.message);
        tableExists = false;
      }

      if (!tableExists) {
        console.log('⚠️ [APP] La tabla "pacientes" no existe aún (probablemente será creada por TypeORM)');
        return;
      }

      console.log('✅ [APP] Tabla "pacientes" encontrada. Verificando columnas...');

      let hasColumn = false;
      try {
        hasColumn = await queryRunner.hasColumn('pacientes', 'fecha_nacimiento');
      } catch (columnCheckError) {
        console.warn('⚠️ [APP] Error verificando columna:', columnCheckError.message);
        hasColumn = false;
      }

      if (!hasColumn) {
        console.log('⚠️ [APP] Columna fecha_nacimiento NO existe. Agregando...');
        try {
          await queryRunner.query(
            `ALTER TABLE "pacientes" ADD COLUMN "fecha_nacimiento" date`
          );
          console.log('✅ [APP] Columna fecha_nacimiento agregada exitosamente');
        } catch (alterError) {
          console.error('❌ [APP] Error al agregar columna:', alterError.message);
          // No relanzar el error, permitir que la app continúe
        }
      } else {
        console.log('✅ [APP] Columna fecha_nacimiento ya existe en la tabla');
      }

      console.log('✅ [APP] Verificación de esquema completada exitosamente');
    } catch (error) {
      console.error('❌ [APP] Error durante verificación de esquema:', error?.message || 'Unknown error');
      if (error?.stack) {
        console.error('❌ [APP] Stack:', error.stack);
      }
      // No relanzar el error - permitir que la app continúe incluso si hay errores de esquema
    } finally {
      try {
        if (queryRunner) {
          console.log('🔍 [APP] Liberando QueryRunner...');
          await queryRunner.release();
          console.log('✅ [APP] QueryRunner liberado');
        }
      } catch (releaseError) {
        console.warn('⚠️ [APP] Error liberando QueryRunner:', releaseError?.message || 'Unknown error');
      }
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
