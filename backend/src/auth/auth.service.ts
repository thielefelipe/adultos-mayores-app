import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsuarioEntity, TokenRevocadoEntity } from '../entities';
import { LoginDto } from './dtos/login.dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AuthService {
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
    console.log('LOGIN ATTEMPT:', loginDto.username);
    let usuario: UsuarioEntity | null = null;
    try {
      usuario = await this.usuarioRepository.findOne({
        where: { username: loginDto.username },
      });
      console.log('USUARIO FOUND:', !!usuario);
    } catch(e) {
      console.error('ERROR FINDING USER:', e);
      throw e;
    }

    console.log('ACTIVO:', usuario?.activo);
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

    console.log('PASSWORD CHECK...');
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

    console.log('PASSWORD VALID:', passwordValida);
    // Actualizar último acceso
    try {
      usuario.ultimoAcceso = new Date();
      await this.usuarioRepository.save(usuario);
      console.log('ULTIMO ACCESO SAVED');
    } catch(e) {
      console.error('ERROR SAVING ULTIMO ACCESO:', e);
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
    console.log('AUDIT SAVED');
    } catch(e) { console.error('ERROR AUDIT:', e); throw e; }

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
