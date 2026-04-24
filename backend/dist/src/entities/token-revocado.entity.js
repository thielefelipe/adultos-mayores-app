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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRevocadoEntity = void 0;
const typeorm_1 = require("typeorm");
let TokenRevocadoEntity = class TokenRevocadoEntity {
    id;
    token;
    usuarioId;
    username;
    revocado;
    expiresAt;
};
exports.TokenRevocadoEntity = TokenRevocadoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TokenRevocadoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], TokenRevocadoEntity.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 36 }),
    __metadata("design:type", String)
], TokenRevocadoEntity.prototype, "usuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TokenRevocadoEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TokenRevocadoEntity.prototype, "revocado", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], TokenRevocadoEntity.prototype, "expiresAt", void 0);
exports.TokenRevocadoEntity = TokenRevocadoEntity = __decorate([
    (0, typeorm_1.Entity)('tokens_revocados'),
    (0, typeorm_1.Index)(['token']),
    (0, typeorm_1.Index)(['usuarioId'])
], TokenRevocadoEntity);
//# sourceMappingURL=token-revocado.entity.js.map