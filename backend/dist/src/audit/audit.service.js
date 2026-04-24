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
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
let AuditService = class AuditService {
    auditRepository;
    constructor(auditRepository) {
        this.auditRepository = auditRepository;
    }
    async registrar(usuario, accion, entidad, entidadId, cambios, ip) {
        const log = this.auditRepository.create({
            usuario,
            accion,
            entidad,
            entidadId,
            cambios: cambios ? JSON.stringify(cambios) : undefined,
            ip,
        });
        await this.auditRepository.save(log);
    }
    async obtenerPorUsuario(usuario, limite = 100) {
        return this.auditRepository
            .find({
            where: { usuario },
            order: { timestamp: 'DESC' },
            take: limite,
        });
    }
    async obtenerPorEntidad(entidad, entidadId) {
        return this.auditRepository
            .find({
            where: { entidad, entidadId },
            order: { timestamp: 'DESC' },
        });
    }
    async obtenerTodos(limite = 500) {
        return this.auditRepository
            .find({
            order: { timestamp: 'DESC' },
            take: limite,
        });
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.AuditLogEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuditService);
//# sourceMappingURL=audit.service.js.map