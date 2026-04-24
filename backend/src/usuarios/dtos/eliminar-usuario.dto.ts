import { IsString } from 'class-validator';

export class EliminarUsuarioDto {
  @IsString()
  passwordConfirmacion: string;
}
