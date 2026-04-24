"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const entities_1 = require("./entities");
const audit_module_1 = require("./audit/audit.module");
const auth_module_1 = require("./auth/auth.module");
const pacientes_module_1 = require("./pacientes/pacientes.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const crear_admin_seeder_1 = require("./seeders/crear-admin.seeder");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'localhost'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'admin'),
                    password: configService.get('DB_PASSWORD', 'admin'),
                    database: configService.get('DB_NAME', 'centros_diurnos_db'),
                    entities: [entities_1.PacienteEntity, entities_1.UsuarioEntity, entities_1.AuditLogEntity, entities_1.TokenRevocadoEntity],
                    synchronize: configService.get('NODE_ENV') === 'development',
                    logging: configService.get('NODE_ENV') === 'development',
                    ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([entities_1.UsuarioEntity]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET', 'dev-secret-key'),
                    signOptions: {
                        expiresIn: configService.get('JWT_EXPIRE', '24h'),
                    },
                }),
                global: true,
            }),
            audit_module_1.AuditModule,
            auth_module_1.AuthModule,
            pacientes_module_1.PacientesModule,
            usuarios_module_1.UsuariosModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, crear_admin_seeder_1.CrearAdminSeeder],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map