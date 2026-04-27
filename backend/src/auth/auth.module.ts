import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity, TokenRevocadoEntity } from '../entities';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuditModule } from '../audit/audit.module';
import { JwtGuard } from './guards/jwt.guard';
import { TokenRevocadoService } from './services/token-revocado.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, TokenRevocadoEntity]),
    AuditModule,
  ],
  providers: [AuthService, TokenRevocadoService, JwtGuard],
  controllers: [AuthController],
  exports: [AuthService, TokenRevocadoService, JwtGuard],
})
export class AuthModule {}
