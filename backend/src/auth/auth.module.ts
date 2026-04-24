import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity, TokenRevocadoEntity } from '../entities';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioEntity, TokenRevocadoEntity]),
    AuditModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
