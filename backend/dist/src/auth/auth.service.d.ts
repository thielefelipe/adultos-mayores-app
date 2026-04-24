import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UsuarioEntity, TokenRevocadoEntity } from '../entities';
import { LoginDto } from './dtos/login.dto';
import { AuditService } from '../audit/audit.service';
export declare class AuthService {
    private usuarioRepository;
    private tokenRevocadoRepository;
    private jwtService;
    private auditService;
    constructor(usuarioRepository: Repository<UsuarioEntity>, tokenRevocadoRepository: Repository<TokenRevocadoEntity>, jwtService: JwtService, auditService: AuditService);
    hashPassword(password: string): Promise<string>;
    comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean>;
    login(loginDto: LoginDto, ip?: string): Promise<{
        access_token: string;
        usuario: {
            id: string;
            username: string;
            nombre: string;
            rol: string;
        };
    }>;
    validarToken(token: string): Promise<any>;
    revocarToken(token: string, usuarioId: string, username: string, expiresAt: Date): Promise<void>;
    verificarTokenRevocado(token: string): Promise<boolean>;
}
