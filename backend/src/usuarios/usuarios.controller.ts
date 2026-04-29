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
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
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
export class UsuariosController {
  constructor(
    private usuariosService: UsuariosService,
    private ubicacionService: UbicacionService,
  ) {}

  @Get('operadores')
  async obtenerOperadores() {
    const usuarios = await this.usuariosService.obtenerTodos();
    return usuarios.filter(u => (u.rol === 'operador' || u.rol === 'analista') && u.activo);
  }

  @Post('cambiar-contrasena')
  @UseGuards(JwtGuard, RolesGuard)
  async cambiarContrasena(@Body() cambiarDto: CambiarContrasenaDto, @Request() req) {
    return this.usuariosService.cambiarContrasena(
      req.user.sub,
      cambiarDto,
      req.user.username,
    );
  }

  @Get()
  @UseGuards(JwtGuard, RolesGuard)
  async obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  @Get('activos')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
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
  @Roles('admin')
  async crear(@Body() crearDto: CrearUsuarioDto, @Request() req) {
    return this.usuariosService.crear(crearDto, req.user.username);
  }

  @Get(':id')
  @Roles('admin')
  async obtenerPorId(@Param('id') id: string) {
    return this.usuariosService.obtenerPorId(id);
  }

  @Put(':id')
  @Roles('admin')
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarDto: ActualizarUsuarioDto,
    @Request() req,
  ) {
    return this.usuariosService.actualizar(id, actualizarDto, req.user.username);
  }

  @Post(':id/restablecer-contrasena')
  @Roles('admin')
  async restablecerContrasena(
    @Param('id') id: string,
    @Body() restablecerDto: RestablecerContrasenaDto,
    @Request() req,
  ) {
    return this.usuariosService.restablecerContrasena(id, restablecerDto, req.user.username);
  }

  @Delete(':id')
  @Roles('admin')
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

  @Post(':id/reactivar')
  @Roles('admin')
  async reactivar(
    @Param('id') id: string,
    @Request() req,
  ) {
    return this.usuariosService.reactivar(id, req.user.username);
  }
}
