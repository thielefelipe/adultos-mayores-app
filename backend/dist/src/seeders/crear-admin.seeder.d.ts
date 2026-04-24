import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../entities';
export declare class CrearAdminSeeder implements OnModuleInit {
    private usuarioRepository;
    private logger;
    constructor(usuarioRepository: Repository<UsuarioEntity>);
    onModuleInit(): Promise<void>;
    seed(): Promise<void>;
}
