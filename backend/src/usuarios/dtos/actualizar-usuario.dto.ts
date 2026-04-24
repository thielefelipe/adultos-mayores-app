import { IsString, IsOptional, MaxLength, IsEnum, MinLength, IsEmail, Matches } from 'class-validator';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  nombre?: string;

  @IsOptional()
  @IsEnum(['admin', 'operador', 'analista'])
  rol?: 'admin' | 'operador' | 'analista';

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9\s\-\(\)]{9,}$/, { message: 'Teléfono inválido' })
  telefono?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  provincia?: string;

  @IsOptional()
  @IsString()
  comuna?: string;
}
