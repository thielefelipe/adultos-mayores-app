import { Injectable } from '@nestjs/common';
import { chileRegions } from '../data/chile-regions';

@Injectable()
export class UbicacionService {
  getRegiones(): string[] {
    return chileRegions.map(r => r.nombre).sort();
  }

  getProvincias(region: string): string[] {
    const r = chileRegions.find(x => x.nombre === region);
    if (!r) return [];
    return r.provincias.map(p => p.nombre).sort();
  }

  getComunas(region: string, provincia: string): string[] {
    const r = chileRegions.find(x => x.nombre === region);
    if (!r) return [];
    const p = r.provincias.find(x => x.nombre === provincia);
    if (!p) return [];
    return p.comunas.sort();
  }
}
