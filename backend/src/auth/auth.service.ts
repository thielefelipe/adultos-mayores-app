import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity, TokenRevocadoEntity } from '../entities';
import { LoginDto } from './dtos/login.dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(TokenRevocadoEntity)
    private tokenRevocadoRepository: Repository<TokenRevocadoEntity>,
    private jwtService: JwtService,
    private auditService: AuditService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async login(loginDto: LoginDto, ip?: string) {
    this.logger.debug(`Login attempt for user: ${loginDto.username}`);
    let usuario: UsuarioEntity | null = null;
    try {
      usuario = await this.usuarioRepository.findOne({
        where: { username: loginDto.username },
      });
      this.logger.debug(`User found: ${!!usuario}`);
    } catch(e) {
      this.logger.error('Error finding user', e);
      throw e;
    }

    this.logger.debug(`User active: ${usuario?.activo}`);
    if (!usuario || !usuario.activo) {
      await this.auditService.registrar(
        loginDto.username,
        'LOGIN_FAILED',
        'usuario',
        usuario?.id || 'unknown',
        { razon: 'usuario no encontrado o inactivo' },
        ip,
      );
      throw new UnauthorizedException('Credenciales inválidas');
    }

    this.logger.debug('Validating password');
    const passwordValida = await this.comparePasswords(
      loginDto.password,
      usuario.password,
    );

    if (!passwordValida) {
      await this.auditService.registrar(
        loginDto.username,
        'LOGIN_FAILED',
        'usuario',
        usuario.id,
        { razon: 'contraseña incorrecta' },
        ip,
      );
      throw new UnauthorizedException('Credenciales inválidas');
    }

    this.logger.debug('Password is valid');
    // Actualizar último acceso
    try {
      usuario.ultimoAcceso = new Date();
      await this.usuarioRepository.save(usuario);
      this.logger.debug('Last access updated');
    } catch(e) {
      this.logger.error('Error saving last access', e);
      throw e;
    }

    // Registrar en auditoría
    try {
    await this.auditService.registrar(
      usuario.username,
      'LOGIN',
      'usuario',
      usuario.id,
      null,
      ip,
    );
    this.logger.debug('Login audit registered');
    } catch(e) { this.logger.error('Error registering audit', e); throw e; }

    // Generar JWT
    const payload = {
      sub: usuario.id,
      username: usuario.username,
      nombre: usuario.nombre,
      rol: usuario.rol,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    };
  }

  async validarToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async revocarToken(token: string, usuarioId: string, username: string, expiresAt: Date) {
    const tokenRevocado = this.tokenRevocadoRepository.create({
      token,
      usuarioId,
      username,
      expiresAt,
    });

    await this.tokenRevocadoRepository.save(tokenRevocado);

    await this.auditService.registrar(
      username,
      'LOGOUT',
      'token',
      usuarioId,
      { accion: 'Token revocado' },
    );
  }

  async verificarTokenRevocado(token: string): Promise<boolean> {
    const revocado = await this.tokenRevocadoRepository.findOne({
      where: { token },
    });
    return !!revocado;
  }
}
