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
exports.PacientesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const audit_service_1 = require("../audit/audit.service");
let PacientesService = class PacientesService {
    pacienteRepository;
    auditService;
    constructor(pacienteRepository, auditService) {
        this.pacienteRepository = pacienteRepository;
        this.auditService = auditService;
    }
    async crear(crearDto, usuarioId, username) {
        const rutExistente = await this.pacienteRepository.findOne({
            where: { rut: crearDto.rut, dv: crearDto.dv, eliminado: false },
        });
        if (rutExistente) {
            throw new common_1.BadRequestException('RUT ya existe en el sistema');
        }
        const paciente = this.pacienteRepository.create({
            ...crearDto,
            creadoPor: username,
        });
        const resultado = await this.pacienteRepository.save(paciente);
        await this.auditService.registrar(username, 'CREATE', 'paciente', resultado.id, { rut: crearDto.rut, nombre: crearDto.nombre });
        return resultado;
    }
    async obtenerTodos(pagina = 1, limite = 20) {
        const skip = (pagina - 1) * limite;
        const [pacientes, total] = await this.pacienteRepository.findAndCount({
            where: { eliminado: false },
            skip,
            take: limite,
            order: { fechaRegistro: 'DESC' },
        });
        return {
            datos: pacientes,
            total,
            pagina,
            totalPaginas: Math.ceil(total / limite),
        };
    }
    async obtenerPorId(id) {
        const paciente = await this.pacienteRepository.findOne({
            where: { id, eliminado: false },
        });
        if (!paciente) {
            throw new common_1.NotFoundException('Paciente no encontrado');
        }
        return paciente;
    }
    async buscar(termino, pagina = 1, limite = 20) {
        const skip = (pagina - 1) * limite;
        const [pacientes, total] = await this.pacienteRepository.findAndCount({
            where: [
                { nombre: Like(`%${termino}%`), eliminado: false },
                { rut: Like(`%${termino}%`), eliminado: false },
            ],
            skip,
            take: limite,
            order: { fechaRegistro: 'DESC' },
        });
        return {
            datos: pacientes,
            total,
            pagina,
            totalPaginas: Math.ceil(total / limite),
        };
    }
    async actualizar(id, actualizarDto, username) {
        const paciente = await this.obtenerPorId(id);
        const cambios = {};
        for (const key in actualizarDto) {
            if (paciente[key] !== actualizarDto[key]) {
                cambios[key] = {
                    anterior: paciente[key],
                    nuevo: actualizarDto[key],
                };
            }
        }
        Object.assign(paciente, actualizarDto, {
            modificadoPor: username,
            modificadoEn: new Date(),
        });
        const resultado = await this.pacienteRepository.save(paciente);
        await this.auditService.registrar(username, 'UPDATE', 'paciente', id, cambios);
        return resultado;
    }
    async eliminar(id, username) {
        const paciente = await this.obtenerPorId(id);
        paciente.eliminado = true;
        paciente.fechaEliminacion = new Date();
        paciente.modificadoPor = username;
        paciente.modificadoEn = new Date();
        await this.pacienteRepository.save(paciente);
        await this.auditService.registrar(username, 'DELETE', 'paciente', id, { motivo: 'eliminación de registro' });
    }
    async exportarCSV() {
        const pacientes = await this.pacienteRepository.find({
            where: { eliminado: false },
        });
        if (pacientes.length === 0) {
            return 'No hay pacientes para exportar';
        }
        const headers = [
            'ID',
            'RUT',
            'DV',
            'Nombre',
            'Edad',
            'Sexo',
            'Teléfono',
            'Escolaridad',
            'Comuna',
            'Dependencia',
            'Barthel1',
            'Barthel2',
            'Pfeiffer1',
            'Pfeiffer2',
            'Lawton1',
            'Lawton2',
            'TUG1',
            'TUG2',
            'Minimental1',
            'Minimental2',
            'Yesavage1',
            'Yesavage2',
            'EQ1',
            'EQ2',
            'T1_Punt',
            'T2_Punt',
            'T3_Punt',
            'T4_Punt',
            'Fecha Registro',
            'Creado Por',
        ];
        const rows = pacientes.map((p) => [
            p.id,
            p.rut,
            p.dv,
            p.nombre,
            p.edad,
            p.sexo,
            p.telefono,
            p.escolaridad,
            p.comuna,
            p.dependencia,
            p.barthel1,
            p.barthel2,
            p.pfeiffer1,
            p.pfeiffer2,
            p.lawton1,
            p.lawton2,
            p.tug1,
            p.tug2,
            p.mini1,
            p.mini2,
            p.yesa1,
            p.yesa2,
            p.eq1,
            p.eq2,
            p.t1_punt,
            p.t2_punt,
            p.t3_punt,
            p.t4_punt,
            p.fechaRegistro,
            p.creadoPor,
        ]);
        const csv = headers.join(',') +
            '\n' +
            rows.map((row) => row.map((cell) => `"${cell || ''}"`).join(',')).join('\n');
        return csv;
    }
};
exports.PacientesService = PacientesService;
exports.PacientesService = PacientesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.PacienteEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        audit_service_1.AuditService])
], PacientesService);
function Like(pattern) {
    return pattern;
}
//# sourceMappingURL=pacientes.service.js.map