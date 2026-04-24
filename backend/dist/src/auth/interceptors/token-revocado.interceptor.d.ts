import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
export declare class TokenRevocadoInterceptor implements NestInterceptor {
    private authService;
    constructor(authService: AuthService);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
    private extractToken;
}
