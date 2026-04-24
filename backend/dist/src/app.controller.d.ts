import { AppService } from './app.service';
import { CrearAdminSeeder } from './seeders/crear-admin.seeder';
export declare class AppController {
    private readonly appService;
    private readonly seeder;
    constructor(appService: AppService, seeder: CrearAdminSeeder);
    getHello(): string;
    initSeed(): Promise<{
        message: string;
    }>;
}
