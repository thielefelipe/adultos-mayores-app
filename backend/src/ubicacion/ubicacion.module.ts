import { Module } from '@nestjs/common';
import { UbicacionController } from './ubicacion.controller';
import { UbicacionService } from '../services/ubicacion.service';

@Module({
  controllers: [UbicacionController],
  providers: [UbicacionService],
})
export class UbicacionModule {}
