import { IsString, IsEmail, MinLength, MaxLength, IsEnum, IsOptional, Matches } from 'class-validator';

export class CrearUsuarioDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  nombre: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(['admin', 'operador', 'analista'])
  rol: 'admin' | 'operador' | 'analista';

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
