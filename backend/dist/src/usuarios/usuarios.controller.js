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
exports.UsuariosController = exports.UbicacionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const usuarios_service_1 = require("./usuarios.service");
const ubicacion_service_1 = require("../services/ubicacion.service");
const dtos_1 = require("./dtos");
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
    (0, common_1.Controller)('ubicacion'),
    __metadata("design:paramtypes", [ubicacion_service_1.UbicacionService])
], UbicacionController);
let UsuariosController = class UsuariosController {
    usuariosService;
    ubicacionService;
    constructor(usuariosService, ubicacionService) {
        this.usuariosService = usuariosService;
        this.ubicacionService = ubicacionService;
    }
    async cambiarContrasena(cambiarDto, req) {
        return this.usuariosService.cambiarContrasena(req.user.sub, cambiarDto, req.user.username);
    }
    async obtenerTodos() {
        return this.usuariosService.obtenerTodos();
    }
    async crear(crearDto, req) {
        return this.usuariosService.crear(crearDto, req.user.username);
    }
    async obtenerPorId(id) {
        return this.usuariosService.obtenerPorId(id);
    }
    async actualizar(id, actualizarDto, req) {
        return this.usuariosService.actualizar(id, actualizarDto, req.user.username);
    }
    async restablecerContrasena(id, restablecerDto, req) {
        return this.usuariosService.restablecerContrasena(id, restablecerDto, req.user.username);
    }
    async eliminar(id, eliminarDto, req) {
        const usuario = await this.usuariosService.obtenerPorId(req.user.sub);
        return this.usuariosService.eliminar(id, eliminarDto, req.user.username, usuario.password);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Post)('cambiar-contrasena'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CambiarContrasenaDto, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "cambiarContrasena", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "obtenerTodos", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CrearUsuarioDto, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "obtenerPorId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.ActualizarUsuarioDto, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Post)(':id/restablecer-contrasena'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.RestablecerContrasenaDto, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "restablecerContrasena", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.EliminarUsuarioDto, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "eliminar", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('usuarios'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        ubicacion_service_1.UbicacionService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map