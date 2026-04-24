"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const entities_1 = require("../entities");
const audit_service_1 = require("../audit/audit.service");
let UsuariosService = class UsuariosService {
    usuarioRepository;
    auditService;
    constructor(usuarioRepository, auditService) {
        this.usuarioRepository = usuarioRepository;
        this.auditService = auditService;
    }
    async obtenerTodos() {
        return this.usuarioRepository.find({
            where: { activo: true },
            select: ['id', 'username', 'nombre', 'rol', 'email', 'telefono', 'region', 'provincia', 'comuna', 'creado', 'ultimoAcceso'],
        });
    }
    async obtenerPorId(id) {
        const usuario = await this.usuarioRepository.findOne({ where: { id } });
        if (!usuario) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return usuario;
    }
    async crear(crearDto, usuarioAdmin) {
        const existente = await this.usuarioRepository.findOne({
            where: { username: crearDto.username },
        });
        if (existente) {
            throw new common_1.BadRequestException('El usuario ya existe');
        }
        const passwordHash = await this.hashPassword(crearDto.password);
        const usuario = this.usuarioRepository.create({
            ...crearDto,
            password: passwordHash,
        });
        const usuarioCreado = await this.usuarioRepository.save(usuario);
        await this.auditService.registrar(usuarioAdmin, 'CREAR_USUARIO', 'usuario', usuarioCreado.id, { username: crearDto.username, rol: crearDto.rol });
        return {
            id: usuarioCreado.id,
            username: usuarioCreado.username,
            nombre: usuarioCreado.nombre,
            rol: usuarioCreado.rol,
            email: usuarioCreado.email,
            telefono: usuarioCreado.telefono,
            region: usuarioCreado.region,
            provincia: usuarioCreado.provincia,
            comuna: usuarioCreado.comuna,
        };
    }
    async actualizar(id, actualizarDto, usuarioAdmin) {
        const usuario = await this.obtenerPorId(id);
        const cambios = {};
        if (actualizarDto.nombre) {
            cambios['nombre'] = actualizarDto.nombre;
            usuario.nombre = actualizarDto.nombre;
        }
        if (actualizarDto.rol) {
            cambios['rol'] = actualizarDto.rol;
            usuario.rol = actualizarDto.rol;
        }
        if (actualizarDto.email) {
            cambios['email'] = actualizarDto.email;
            usuario.email = actualizarDto.email;
        }
        if (actualizarDto.telefono) {
            cambios['telefono'] = actualizarDto.telefono;
            usuario.telefono = actualizarDto.telefono;
        }
        if (actualizarDto.region) {
            cambios['region'] = actualizarDto.region;
            usuario.region = actualizarDto.region;
        }
        if (actualizarDto.provincia) {
            cambios['provincia'] = actualizarDto.provincia;
            usuario.provincia = actualizarDto.provincia;
        }
        if (actualizarDto.comuna) {
            cambios['comuna'] = actualizarDto.comuna;
            usuario.comuna = actualizarDto.comuna;
        }
        await this.usuarioRepository.save(usuario);
        await this.auditService.registrar(usuarioAdmin, 'ACTUALIZAR_USUARIO', 'usuario', id, cambios);
        return {
            id: usuario.id,
            username: usuario.username,
            nombre: usuario.nombre,
            rol: usuario.rol,
        };
    }
    async restablecerContrasena(id, restablecerDto, usuarioAdmin) {
        if (restablecerDto.passwordNueva !== restablecerDto.passwordConfirmacion) {
            throw new common_1.BadRequestException('Las contraseñas no coinciden');
        }
        const usuario = await this.obtenerPorId(id);
        usuario.password = await this.hashPassword(restablecerDto.passwordNueva);
        await this.usuarioRepository.save(usuario);
        await this.auditService.registrar(usuarioAdmin, 'RESTABLECER_CONTRASENA', 'usuario', id, { username: usuario.username });
        return { mensaje: 'Contraseña restablecida correctamente' };
    }
    async cambiarContrasena(usuarioId, cambiarDto, username) {
        const usuario = await this.obtenerPorId(usuarioId);
        const passwordValida = await bcrypt.compare(cambiarDto.passwordActual, usuario.password);
        if (!passwordValida) {
            throw new common_1.UnauthorizedException('Contraseña actual incorrecta');
        }
        usuario.password = await this.hashPassword(cambiarDto.passwordNueva);
        await this.usuarioRepository.save(usuario);
        await this.auditService.registrar(username, 'CAMBIAR_CONTRASENA', 'usuario', usuarioId, { username: usuario.username });
        return { mensaje: 'Contraseña cambiada correctamente' };
    }
    async eliminar(id, eliminarDto, usuarioAdmin, passwordAdmin) {
        const usuario = await this.obtenerPorId(id);
        const passwordValida = await bcrypt.compare(eliminarDto.passwordConfirmacion, passwordAdmin);
        if (!passwordValida) {
            throw new common_1.UnauthorizedException('Contraseña de administrador incorrecta');
        }
        usuario.activo = false;
        await this.usuarioRepository.save(usuario);
        await this.auditService.registrar(usuarioAdmin, 'ELIMINAR_USUARIO', 'usuario', id, {
            username: usuario.username,
            rol: usuario.rol,
            nota: 'Usuario desactivado (soft delete)',
        });
        return { mensaje: 'Usuario eliminado correctamente' };
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.UsuarioEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        audit_service_1.AuditService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map