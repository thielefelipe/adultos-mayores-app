import { IsString, IsOptional, MaxLength, IsEnum, MinLength } from 'class-validator';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  nombre?: string;

  @IsOptional()
  @IsEnum(['admin', 'operador', 'analista'])
  rol?: 'admin' | 'operador' | 'analista';
}
