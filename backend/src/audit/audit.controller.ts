import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get('logs')
  async obtenerTodos(@Query('limite') limite: number = 500) {
    return this.auditService.obtenerTodos(limite);
  }

  @Get('usuario/:usuario')
  async obtenerPorUsuario(
    @Param('usuario') usuario: string,
    @Query('limite') limite: number = 100,
  ) {
    return this.auditService.obtenerPorUsuario(usuario, limite);
  }

  @Get('entidad/:entidad/:id')
  async obtenerPorEntidad(
    @Param('entidad') entidad: string,
    @Param('id') id: string,
  ) {
    return this.auditService.obtenerPorEntidad(entidad, id);
  }
}
