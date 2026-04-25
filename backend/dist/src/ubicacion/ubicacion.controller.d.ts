import { UbicacionService } from '../services/ubicacion.service';
export declare class UbicacionController {
    private ubicacionService;
    constructor(ubicacionService: UbicacionService);
    getRegiones(): string[];
    getProvincias(region: string): string[];
    getComunas(region: string, provincia: string): string[];
}
