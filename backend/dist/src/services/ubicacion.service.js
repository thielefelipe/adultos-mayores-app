"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbicacionService = void 0;
const common_1 = require("@nestjs/common");
const chile_regions_1 = require("../data/chile-regions");
let UbicacionService = class UbicacionService {
    getRegiones() {
        return chile_regions_1.chileRegions.map(r => r.nombre).sort();
    }
    getProvincias(region) {
        const r = chile_regions_1.chileRegions.find(x => x.nombre === region);
        if (!r)
            return [];
        return r.provincias.map(p => p.nombre).sort();
    }
    getComunas(region, provincia) {
        const r = chile_regions_1.chileRegions.find(x => x.nombre === region);
        if (!r)
            return [];
        const p = r.provincias.find(x => x.nombre === provincia);
        if (!p)
            return [];
        return p.comunas.sort();
    }
};
exports.UbicacionService = UbicacionService;
exports.UbicacionService = UbicacionService = __decorate([
    (0, common_1.Injectable)()
], UbicacionService);
//# sourceMappingURL=ubicacion.service.js.map