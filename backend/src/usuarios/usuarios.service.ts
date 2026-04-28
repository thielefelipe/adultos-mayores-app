import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity } from '../entities';
import { AuditService } from '../audit/audit.service';
import { CrearUsuarioDto, ActualizarUsuarioDto, CambiarContrasenaDto, EliminarUsuarioDto, RestablecerContrasenaDto } from './dtos';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    private auditService: AuditService,
  ) {}

  async obtenerTodos() {
    return this.usuarioRepository.find({
      select: ['id', 'username', 'nombre', 'rol', 'email', 'telefono', 'region', 'provincia', 'comuna', 'creado', 'ultimoAcceso', 'activo'],
    });
  }

  async obtenerTodosConUltimoAcceso() {
    return this.usuarioRepository.find({
      where: { activo: true },
      select: ['id', 'username', 'nombre', 'rol', 'email', 'ultimoAcceso'],
    });
  }

  async actualizarUltimoAcceso(usuarioId: string) {
    const usuario = await this.obtenerPorId(usuarioId);
    usuario.ultimoAcceso = new Date();
    return this.usuarioRepository.save(usuario);
  }

  async obtenerPorId(id: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return usuario;
  }

  async crear(crearDto: CrearUsuarioDto, usuarioAdmin: string) {
    const existente = await this.usuarioRepository.findOne({
      where: { username: crearDto.username },
    });

    if (existente) {
      throw new BadRequestException('El usuario ya existe');
    }

    const passwordHash = await this.hashPassword(crearDto.password);

    const usuario = this.usuarioRepository.create({
      ...crearDto,
      password: passwordHash,
    });

    const usuarioCreado = await this.usuarioRepository.save(usuario);

    await this.auditService.registrar(
      usuarioAdmin,
      'CREAR_USUARIO',
      'usuario',
      usuarioCreado.id,
      { username: crearDto.username, rol: crearDto.rol },
    );

    return {
      id: usuarioCreado.id,
      username: usuarioCreado.username,
      nombre: usuarioCreado.nombre,
      rol: usuarioCreado.rol,
      email: usuarioCreado.email,
      telefono: usuarioCreado.telefono,
      region: usuarioCreado.region,
      provincia: usuarioCreado.provincia,
      comuna: usuarioCreado.comuna,
    };
  }

  async actualizar(id: string, actualizarDto: ActualizarUsuarioDto, usuarioAdmin: string) {
    const usuario = await this.obtenerPorId(id);

    const cambios = {};
    if (actualizarDto.rut) {
      cambios['rut'] = actualizarDto.rut;
      usuario.rut = actualizarDto.rut;
    }
    if (actualizarDto.nombre) {
      cambios['nombre'] = actualizarDto.nombre;
      usuario.nombre = actualizarDto.nombre;
    }
    if (actualizarDto.rol) {
      cambios['rol'] = actualizarDto.rol;
      usuario.rol = actualizarDto.rol;
    }
    if (actualizarDto.email) {
      cambios['email'] = actualizarDto.email;
      usuario.email = actualizarDto.email;
    }
    if (actualizarDto.telefono) {
      cambios['telefono'] = actualizarDto.telefono;
      usuario.telefono = actualizarDto.telefono;
    }
    if (actualizarDto.region) {
      cambios['region'] = actualizarDto.region;
      usuario.region = actualizarDto.region;
    }
    if (actualizarDto.provincia) {
      cambios['provincia'] = actualizarDto.provincia;
      usuario.provincia = actualizarDto.provincia;
    }
    if (actualizarDto.comuna) {
      cambios['comuna'] = actualizarDto.comuna;
      usuario.comuna = actualizarDto.comuna;
    }

    await this.usuarioRepository.save(usuario);

    await this.auditService.registrar(
      usuarioAdmin,
      'ACTUALIZAR_USUARIO',
      'usuario',
      id,
      cambios,
    );

    return {
      id: usuario.id,
      username: usuario.username,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };
  }

  async restablecerContrasena(
    id: string,
    restablecerDto: RestablecerContrasenaDto,
    usuarioAdmin: string,
  ) {
    if (restablecerDto.passwordNueva !== restablecerDto.passwordConfirmacion) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const usuario = await this.obtenerPorId(id);
    usuario.password = await this.hashPassword(restablecerDto.passwordNueva);
    await this.usuarioRepository.save(usuario);

    await this.auditService.registrar(
      usuarioAdmin,
      'RESTABLECER_CONTRASENA',
      'usuario',
      id,
      { username: usuario.username },
    );

    return { mensaje: 'Contraseña restablecida correctamente' };
  }

  async cambiarContrasena(
    usuarioId: string,
    cambiarDto: CambiarContrasenaDto,
    username: string,
  ) {
    const usuario = await this.obtenerPorId(usuarioId);

    const passwordValida = await bcrypt.compare(cambiarDto.passwordActual, usuario.password);
    if (!passwordValida) {
      throw new UnauthorizedException('Contraseña actual incorrecta');
    }

    usuario.password = await this.hashPassword(cambiarDto.passwordNueva);
    await this.usuarioRepository.save(usuario);

    await this.auditService.registrar(
      username,
      'CAMBIAR_CONTRASENA',
      'usuario',
      usuarioId,
      { username: usuario.username },
    );

    return { mensaje: 'Contraseña cambiada correctamente' };
  }

  async eliminar(
    id: string,
    eliminarDto: EliminarUsuarioDto,
    usuarioAdmin: string,
    passwordAdmin: string,
  ) {
    const usuario = await this.obtenerPorId(id);

    const passwordValida = await bcrypt.compare(eliminarDto.passwordConfirmacion, passwordAdmin);
    if (!passwordValida) {
      throw new UnauthorizedException('Contraseña de administrador incorrecta');
    }

    usuario.activo = false;
    await this.usuarioRepository.save(usuario);

    await this.auditService.registrar(
      usuarioAdmin,
      'ELIMINAR_USUARIO',
      'usuario',
      id,
      {
        username: usuario.username,
        rol: usuario.rol,
        nota: 'Usuario desactivado (soft delete)',
      },
    );

    return { mensaje: 'Usuario eliminado correctamente' };
  }

  async reactivar(id: string, usuarioAdmin: string) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    usuario.activo = true;
    await this.usuarioRepository.save(usuario);

    await this.auditService.registrar(
      usuarioAdmin,
      'REACTIVAR_USUARIO',
      'usuario',
      id,
      { username: usuario.username },
    );

    return { mensaje: 'Usuario reactivado correctamente' };
  }


  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
