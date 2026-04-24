import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  Query,
  HttpCode,
} from '@nestjs/common';
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
  ) {
    return this.pacientesService.obtenerTodos(pagina, limite);
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

  @Delete(':id')
  @HttpCode(204)
  async eliminar(@Param('id') id: string, @Req() req) {
    await this.pacientesService.eliminar(id, req.user.username);
  }
}
