import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entities';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  @Get()
  async getHello() {
    const adminExists = await this.usuarioRepository.findOne({
      where: { username: 'admin' },
    });
    return {
      mensaje: 'API funcionando correctamente',
      version: '1.0.0',
      adminExists: !!adminExists,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('restore-admin')
  async restoreAdmin() {
    const adminExistente = await this.usuarioRepository.findOne({
      where: { username: 'admin' },
    });

    if (adminExistente) {
      return { mensaje: 'Admin ya existe', success: false };
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
    return {
      mensaje: 'Usuario admin restaurado',
      username: 'admin',
      password: 'admin123',
      warning: '⚠️ Cambiar contraseña inmediatamente en producción',
      success: true,
    };
  }
}
