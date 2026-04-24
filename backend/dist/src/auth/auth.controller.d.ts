import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    login(loginDto: LoginDto, req: Request): Promise<{
        access_token: string;
        usuario: {
            id: string;
            username: string;
            nombre: string;
            rol: string;
        };
    }>;
    logout(req: Request): Promise<{
        mensaje: string;
    }>;
    private extractToken;
}
