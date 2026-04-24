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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const entities_1 = require("../entities");
const audit_service_1 = require("../audit/audit.service");
let AuthService = class AuthService {
    usuarioRepository;
    tokenRevocadoRepository;
    jwtService;
    auditService;
    constructor(usuarioRepository, tokenRevocadoRepository, jwtService, auditService) {
        this.usuarioRepository = usuarioRepository;
        this.tokenRevocadoRepository = tokenRevocadoRepository;
        this.jwtService = jwtService;
        this.auditService = auditService;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async comparePasswords(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async login(loginDto, ip) {
        console.log('LOGIN ATTEMPT:', loginDto.username);
        let usuario = null;
        try {
            usuario = await this.usuarioRepository.findOne({
                where: { username: loginDto.username },
            });
            console.log('USUARIO FOUND:', !!usuario);
        }
        catch (e) {
            console.error('ERROR FINDING USER:', e);
            throw e;
        }
        console.log('ACTIVO:', usuario?.activo);
        if (!usuario || !usuario.activo) {
            await this.auditService.registrar(loginDto.username, 'LOGIN_FAILED', 'usuario', usuario?.id || 'unknown', { razon: 'usuario no encontrado o inactivo' }, ip);
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        console.log('PASSWORD CHECK...');
        const passwordValida = await this.comparePasswords(loginDto.password, usuario.password);
        if (!passwordValida) {
            await this.auditService.registrar(loginDto.username, 'LOGIN_FAILED', 'usuario', usuario.id, { razon: 'contraseña incorrecta' }, ip);
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        console.log('PASSWORD VALID:', passwordValida);
        try {
            usuario.ultimoAcceso = new Date();
            await this.usuarioRepository.save(usuario);
            console.log('ULTIMO ACCESO SAVED');
        }
        catch (e) {
            console.error('ERROR SAVING ULTIMO ACCESO:', e);
            throw e;
        }
        try {
            await this.auditService.registrar(usuario.username, 'LOGIN', 'usuario', usuario.id, null, ip);
            console.log('AUDIT SAVED');
        }
        catch (e) {
            console.error('ERROR AUDIT:', e);
            throw e;
        }
        const payload = {
            sub: usuario.id,
            username: usuario.username,
            nombre: usuario.nombre,
            rol: usuario.rol,
        };
        const access_token = this.jwtService.sign(payload);
        return {
            access_token,
            usuario: {
                id: usuario.id,
                username: usuario.username,
                nombre: usuario.nombre,
                rol: usuario.rol,
            },
        };
    }
    async validarToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido o expirado');
        }
    }
    async revocarToken(token, usuarioId, username, expiresAt) {
        const tokenRevocado = this.tokenRevocadoRepository.create({
            token,
            usuarioId,
            username,
            expiresAt,
        });
        await this.tokenRevocadoRepository.save(tokenRevocado);
        await this.auditService.registrar(username, 'LOGOUT', 'token', usuarioId, { accion: 'Token revocado' });
    }
    async verificarTokenRevocado(token) {
        const revocado = await this.tokenRevocadoRepository.findOne({
            where: { token },
        });
        return !!revocado;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.UsuarioEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.TokenRevocadoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService,
        audit_service_1.AuditService])
], AuthService);
//# sourceMappingURL=auth.service.js.map