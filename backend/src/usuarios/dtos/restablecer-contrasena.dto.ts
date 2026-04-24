import { IsString, MinLength } from 'class-validator';

export class RestablecerContrasenaDto {
  @IsString()
  @MinLength(8)
  passwordNueva: string;

  @IsString()
  passwordConfirmacion: string;
}
