import { Controller, Post, Get, Body, Req, HttpCode, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const ip = req.ip || req.socket?.remoteAddress || 'unknown';
    return this.authService.login(loginDto, ip);
  }

  @Get('validate')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async validate() {
    return { valid: true, mensaje: 'Token válido' };
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  @HttpCode(200)
  async logout(@Req() req: Request) {
    const token = this.extractToken(req);
    if (token) {
      const decoded = this.jwtService.decode(token) as any;
      await this.authService.revocarToken(
        token,
        decoded.sub,
        decoded.username,
        new Date(decoded.exp * 1000),
      );
    }
    return { mensaje: 'Sesión cerrada correctamente' };
  }

  private extractToken(req: any): string | undefined {
    const authHeader = req.headers.authorization;
    if (!authHeader) return undefined;
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
