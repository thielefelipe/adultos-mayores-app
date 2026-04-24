import { IsString, MinLength } from 'class-validator';

export class CambiarContrasenaDto {
  @IsString()
  passwordActual: string;

  @IsString()
  @MinLength(8)
  passwordNueva: string;
}
