import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UsuariosService } from './usuarios.service';
import { UbicacionService } from '../services/ubicacion.service';
import { CrearUsuarioDto, ActualizarUsuarioDto, CambiarContrasenaDto, EliminarUsuarioDto, RestablecerContrasenaDto } from './dtos';

@Controller('ubicacion')
export class UbicacionController {
  constructor(private ubicacionService: UbicacionService) {}

  @Get('regiones')
  getRegiones() {
    return this.ubicacionService.getRegiones();
  }

  @Get('provincias')
  getProvincias(@Query('region') region: string) {
    return this.ubicacionService.getProvincias(region);
  }

  @Get('comunas')
  getComunas(@Query('region') region: string, @Query('provincia') provincia: string) {
    return this.ubicacionService.getComunas(region, provincia);
  }
}

@Controller('usuarios')
@UseGuards(JwtGuard)
export class UsuariosController {
  constructor(
    private usuariosService: UsuariosService,
    private ubicacionService: UbicacionService,
  ) {}

  @Post('cambiar-contrasena')
  async cambiarContrasena(@Body() cambiarDto: CambiarContrasenaDto, @Request() req) {
    return this.usuariosService.cambiarContrasena(
      req.user.sub,
      cambiarDto,
      req.user.username,
    );
  }

  @Get()
  async obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  @Get('activos')
  async obtenerActivos() {
    const usuarios = await this.usuariosService.obtenerTodosConUltimoAcceso();
    const ahora = new Date();
    const cincoMinutos = 5 * 60 * 1000;

    return usuarios.filter(u => {
      if (!u.ultimoAcceso) return false;
      const tiempoInactivo = ahora.getTime() - new Date(u.ultimoAcceso).getTime();
      return tiempoInactivo < cincoMinutos;
    });
  }

  @Post('heartbeat')
  async heartbeat(@Request() req) {
    await this.usuariosService.actualizarUltimoAcceso(req.user.sub);
    return { mensaje: 'Heartbeat registrado' };
  }

  @Post()
  async crear(@Body() crearDto: CrearUsuarioDto, @Request() req) {
    return this.usuariosService.crear(crearDto, req.user.username);
  }

  @Get(':id')
  async obtenerPorId(@Param('id') id: string) {
    return this.usuariosService.obtenerPorId(id);
  }

  @Put(':id')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarDto: ActualizarUsuarioDto,
    @Request() req,
  ) {
    return this.usuariosService.actualizar(id, actualizarDto, req.user.username);
  }

  @Post(':id/restablecer-contrasena')
  async restablecerContrasena(
    @Param('id') id: string,
    @Body() restablecerDto: RestablecerContrasenaDto,
    @Request() req,
  ) {
    return this.usuariosService.restablecerContrasena(id, restablecerDto, req.user.username);
  }

  @Delete(':id')
  async eliminar(
    @Param('id') id: string,
    @Body() eliminarDto: EliminarUsuarioDto,
    @Request() req,
  ) {
    const usuario = await this.usuariosService.obtenerPorId(req.user.sub);
    return this.usuariosService.eliminar(
      id,
      eliminarDto,
      req.user.username,
      usuario.password,
    );
  }
}
