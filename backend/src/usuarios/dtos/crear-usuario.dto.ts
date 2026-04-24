import { IsString, IsEmail, MinLength, MaxLength, IsEnum } from 'class-validator';

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
}
