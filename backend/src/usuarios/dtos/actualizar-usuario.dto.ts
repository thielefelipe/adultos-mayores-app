import { IsString, IsOptional, MaxLength, IsEnum, MinLength, IsEmail, Matches } from 'class-validator';

export class ActualizarUsuarioDto {
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]$|^[0-9]{7,8}-[0-9Kk]$|^[0-9]{7,9}$/, { message: 'RUT inválido (ej: 12.345.678-9 o 12345678-9)' })
  rut?: string;

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
