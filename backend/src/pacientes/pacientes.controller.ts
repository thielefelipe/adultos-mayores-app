import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Query,
  HttpCode,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PacientesService } from './pacientes.service';
import { CrearPacienteDto } from './dtos/crear-paciente.dto';

@Controller('pacientes')
@UseGuards(JwtGuard)
export class PacientesController {
  constructor(private pacientesService: PacientesService) {}

  @Post()
  @HttpCode(201)
  async crear(@Body() crearDto: CrearPacienteDto, @Req() req) {
    return this.pacientesService.crear(crearDto, req.user.sub, req.user.username);
  }

  @Get()
  async obtenerTodos(
    @Query('pagina') pagina: number = 1,
    @Query('limite') limite: number = 20,
    @Query('region') region: string = '',
    @Query('provincia') provincia: string = '',
    @Query('comuna') comuna: string = '',
    @Query('anio') anio: number = 0,
    @Query('semestre') semestre: number = 0,
    @Query('operador_id') operador_id: string = '',
    @Req() req,
  ) {
    const rolUsuario = req?.user?.rol;
    const usernameUsuario = req?.user?.username;

    return this.pacientesService.obtenerTodos(pagina, limite, {
      region: region || undefined,
      provincia: provincia || undefined,
      comuna: comuna || undefined,
      anio: anio || undefined,
      semestre: semestre || undefined,
      operador_id: operador_id || undefined,
      rolUsuario,
      usernameUsuario,
    });
  }

  @Get('buscar')
  async buscar(
    @Query('termino') termino: string,
    @Query('pagina') pagina: number = 1,
    @Query('limite') limite: number = 20,
  ) {
    return this.pacientesService.buscar(termino, pagina, limite);
  }

  @Get('export/csv')
  async exportarCSV() {
    const csv = await this.pacientesService.exportarCSV();
    return {
      data: csv,
      filename: 'linea_base_2025.csv',
    };
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return this.pacientesService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarDto: Partial<CrearPacienteDto>,
    @Req() req,
  ) {
    return this.pacientesService.actualizar(id, actualizarDto, req.user.username);
  }

  @Patch(':id')
  async actualizarParcial(
    @Param('id') id: string,
    @Body() actualizarDto: Partial<CrearPacienteDto>,
    @Req() req,
  ) {
    return this.pacientesService.actualizar(id, actualizarDto, req.user.username);
  }

  @Delete(':id')
  @HttpCode(204)
  async eliminar(@Param('id') id: string, @Req() req) {
    await this.pacientesService.eliminar(id, req.user.username);
  }

  @Post(':id/reintegrar')
  async reintegrar(@Param('id') id: string, @Req() req) {
    return this.pacientesService.reintegrar(id, req.user.username);
  }

  @Post(':id/dar-de-alta')
  async darDeAlta(@Param('id') id: string, @Req() req) {
    return this.pacientesService.darDeAlta(id, req.user.username);
  }

  @Post('restaurar/todos')
  @HttpCode(200)
  async restaurarTodos(@Req() req) {
    return this.pacientesService.restaurarTodos(req.user.username);
  }

  @Post(':id/documentos')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads');
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (_req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB por archivo
      fileFilter: (_req, file, cb) => {
        const allowed = /\.(pdf|doc|docx|jpg|jpeg|png|gif|xls|xlsx|csv|txt)$/i;
        if (!allowed.test(extname(file.originalname))) {
          return cb(new BadRequestException('Tipo de archivo no permitido'), false);
        }
        cb(null, true);
      },
    }),
  )
  async subirDocumentos(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No se recibieron archivos');
    }
    return this.pacientesService.agregarDocumentos(id, files, req.user.username);
  }

  @Delete(':id/documentos/:nombreArchivo')
  async eliminarDocumento(
    @Param('id') id: string,
    @Param('nombreArchivo') nombreArchivo: string,
    @Req() req,
  ) {
    return this.pacientesService.eliminarDocumento(id, nombreArchivo, req.user.username);
  }
}
