import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenRevocadoInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (token) {
      const esRevocado = await this.authService.verificarTokenRevocado(token);
      if (esRevocado) {
        throw new UnauthorizedException('Token revocado. Inicia sesión de nuevo');
      }
    }

    return next.handle();
  }

  private extractToken(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
