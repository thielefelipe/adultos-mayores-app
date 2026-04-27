import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDate,
  Min,
  Max,
  MinLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CrearPacienteDto {
  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsString()
  @IsNotEmpty()
  dv: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nombre: string;

  @IsString()
  @IsOptional()
  sexo?: string;

  @IsNumber()
  @IsOptional()
  @Min(18)
  @Max(150)
  edad?: number;

  @IsString()
  @IsOptional()
  @Matches(/^[0-9\s+\-()]*$/, { message: 'Teléfono debe contener solo números y caracteres válidos' })
  telefono?: string;

  @IsString()
  @IsOptional()
  escolaridad?: string;

  @IsString()
  @IsOptional()
  pueblo?: string;

  @IsString()
  @IsOptional()
  rsh?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  f_ingreso?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  f_consentimiento?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  f_egreso?: Date;

  @IsString()
  @IsNotEmpty()
  comuna: string;

  @IsString()
  @IsOptional()
  naturaleza?: string;

  @IsString()
  @IsOptional()
  rural?: string;

  @IsString()
  @IsOptional()
  dependencia?: string;

  @IsString()
  @IsOptional()
  enfermedades?: string;

  @IsString()
  @IsOptional()
  pai?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  obj_pai?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  obj_alc?: number;

  @IsString()
  @IsOptional()
  talleres?: string;

  // VGI Instruments
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  barthel1?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  barthel2?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  pfeiffer1?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(10)
  pfeiffer2?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(8)
  lawton1?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(8)
  lawton2?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  tug1?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  tug2?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(30)
  mini1?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(30)
  mini2?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(15)
  yesa1?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(15)
  yesa2?: number;

  @IsString()
  @IsOptional()
  eq1?: string;

  @IsString()
  @IsOptional()
  eq2?: string;

  @IsString()
  @IsOptional()
  notas?: string;

  @IsString()
  @IsOptional()
  plan?: string;
}
