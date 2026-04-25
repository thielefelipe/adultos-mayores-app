"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbicacionController = void 0;
const common_1 = require("@nestjs/common");
const ubicacion_service_1 = require("../services/ubicacion.service");
let UbicacionController = class UbicacionController {
    ubicacionService;
    constructor(ubicacionService) {
        this.ubicacionService = ubicacionService;
    }
    getRegiones() {
        return this.ubicacionService.getRegiones();
    }
    getProvincias(region) {
        return this.ubicacionService.getProvincias(region);
    }
    getComunas(region, provincia) {
        return this.ubicacionService.getComunas(region, provincia);
    }
};
exports.UbicacionController = UbicacionController;
__decorate([
    (0, common_1.Get)('regiones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UbicacionController.prototype, "getRegiones", null);
__decorate([
    (0, common_1.Get)('provincias'),
    __param(0, (0, common_1.Query)('region')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UbicacionController.prototype, "getProvincias", null);
__decorate([
    (0, common_1.Get)('comunas'),
    __param(0, (0, common_1.Query)('region')),
    __param(1, (0, common_1.Query)('provincia')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UbicacionController.prototype, "getComunas", null);
exports.UbicacionController = UbicacionController = __decorate([
    (0, common_1.Controller)('/ubicacion'),
    __metadata("design:paramtypes", [ubicacion_service_1.UbicacionService])
], UbicacionController);
//# sourceMappingURL=ubicacion.controller.js.map