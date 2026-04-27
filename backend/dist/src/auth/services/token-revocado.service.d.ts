import { Repository } from 'typeorm';
import { TokenRevocadoEntity } from '../../entities';
export declare class TokenRevocadoService {
    private tokenRevocadoRepository;
    constructor(tokenRevocadoRepository: Repository<TokenRevocadoEntity>);
    verificarTokenRevocado(token: string): Promise<boolean>;
}
