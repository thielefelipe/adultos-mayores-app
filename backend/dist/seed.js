"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const crear_admin_seeder_1 = require("./src/seeders/crear-admin.seeder");
async function runSeed() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const seeder = app.get(crear_admin_seeder_1.CrearAdminSeeder);
    try {
        await seeder.seed();
        console.log('✅ Seed completado');
    }
    catch (error) {
        console.error('❌ Error en seed:', error);
    }
    finally {
        await app.close();
    }
}
runSeed();
//# sourceMappingURL=seed.js.map