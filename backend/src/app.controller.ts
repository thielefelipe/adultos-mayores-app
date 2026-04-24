import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CrearAdminSeeder } from './seeders/crear-admin.seeder';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly seeder: CrearAdminSeeder,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('init-seed')
  async initSeed(): Promise<{ message: string }> {
    await this.seeder.seed();
    return { message: 'Usuario admin inicializado' };
  }
}
