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
exports.PacientesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const pacientes_service_1 = require("./pacientes.service");
const crear_paciente_dto_1 = require("./dtos/crear-paciente.dto");
let PacientesController = class PacientesController {
    pacientesService;
    constructor(pacientesService) {
        this.pacientesService = pacientesService;
    }
    async crear(crearDto, req) {
        return this.pacientesService.crear(crearDto, req.user.sub, req.user.username);
    }
    async obtenerTodos(pagina = 1, limite = 20) {
        return this.pacientesService.obtenerTodos(pagina, limite);
    }
    async buscar(termino, pagina = 1, limite = 20) {
        return this.pacientesService.buscar(termino, pagina, limite);
    }
    async exportarCSV() {
        const csv = await this.pacientesService.exportarCSV();
        return {
            data: csv,
            filename: 'linea_base_2025.csv',
        };
    }
    async obtenerPorId(id) {
        return this.pacientesService.obtenerPorId(id);
    }
    async actualizar(id, actualizarDto, req) {
        return this.pacientesService.actualizar(id, actualizarDto, req.user.username);
    }
    async eliminar(id, req) {
        await this.pacientesService.eliminar(id, req.user.username);
    }
};
exports.PacientesController = PacientesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_paciente_dto_1.CrearPacienteDto, Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "crear", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('pagina')),
    __param(1, (0, common_1.Query)('limite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "obtenerTodos", null);
__decorate([
    (0, common_1.Get)('buscar'),
    __param(0, (0, common_1.Query)('termino')),
    __param(1, (0, common_1.Query)('pagina')),
    __param(2, (0, common_1.Query)('limite')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "buscar", null);
__decorate([
    (0, common_1.Get)('export/csv'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "exportarCSV", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "obtenerPorId", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "actualizar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PacientesController.prototype, "eliminar", null);
exports.PacientesController = PacientesController = __decorate([
    (0, common_1.Controller)('pacientes'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [pacientes_service_1.PacientesService])
], PacientesController);
//# sourceMappingURL=pacientes.controller.js.map