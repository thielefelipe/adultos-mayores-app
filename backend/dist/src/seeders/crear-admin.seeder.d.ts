import { Repository } from 'typeorm';
import { UsuarioEntity } from '../entities';
export declare class CrearAdminSeeder {
    private usuarioRepository;
    private logger;
    constructor(usuarioRepository: Repository<UsuarioEntity>);
    seed(): Promise<void>;
}
