import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenRevocadoEntity } from '../../entities';

@Injectable()
export class TokenRevocadoService {
  constructor(
    @InjectRepository(TokenRevocadoEntity)
    private tokenRevocadoRepository: Repository<TokenRevocadoEntity>,
  ) {}

  async verificarTokenRevocado(token: string): Promise<boolean> {
    const revocado = await this.tokenRevocadoRepository.findOne({
      where: { token },
    });
    return !!revocado;
  }
}
