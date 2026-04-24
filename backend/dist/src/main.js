"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const crear_admin_seeder_1 = require("./seeders/crear-admin.seeder");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    try {
        const seeder = app.get(crear_admin_seeder_1.CrearAdminSeeder);
        await seeder.seed();
        console.log('✅ Admin user initialized');
    }
    catch (err) {
        console.error('❌ Seed error:', err);
    }
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map