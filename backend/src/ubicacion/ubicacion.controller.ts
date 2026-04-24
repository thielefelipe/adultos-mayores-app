import { Controller, Get, Query } from '@nestjs/common';
import { UbicacionService } from '../services/ubicacion.service';

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
  getComunas(
    @Query('region') region: string,
    @Query('provincia') provincia: string,
  ) {
    return this.ubicacionService.getComunas(region, provincia);
  }
}
