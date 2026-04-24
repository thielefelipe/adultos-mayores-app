import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from '../entities';

@Injectable()
export class CrearAdminSeeder {
  private logger = new Logger('CrearAdminSeeder');

  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async seed() {
    const adminExistente = await this.usuarioRepository.findOne({
      where: { username: 'admin' },
    });

    if (adminExistente) {
      this.logger.log('Usuario admin ya existe');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    const admin = this.usuarioRepository.create({
      username: 'admin',
      nombre: 'Administrador',
      password: passwordHash,
      rol: 'admin',
      activo: true,
    });

    await this.usuarioRepository.save(admin);
    this.logger.log('Usuario admin creado exitosamente');
    this.logger.log('Credenciales: username=admin, password=admin123');
    this.logger.warn('⚠️  CAMBIAR CONTRASEÑA INMEDIATAMENTE EN PRODUCCIÓN');
  }
}
