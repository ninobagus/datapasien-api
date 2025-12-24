"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const http_exception_filter_1 = require("./filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Patient Management API')
        .setDescription(`
      REST API untuk manajemen data pasien.
      
      ## Fitur:
      - CRUD data pasien
      - Validasi input
      - Pencarian pasien
      - Error handling
      
      ## Teknologi:
      - NestJS
      - PostgreSQL
      - TypeORM
    `)
        .setVersion('1.0')
        .addTag('patients', 'Operasi CRUD untuk data pasien')
        .setContact('Developer', 'https://github.com', 'developer@example.com')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'Patient API Documentation',
        customCss: '.swagger-ui .topbar { display: none }',
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'list',
            filter: true,
            showRequestDuration: true,
        },
    });
    await app.listen(3001);
    console.log('🚀 Backend running on http://localhost:3001');
    console.log('📚 Swagger docs: http://localhost:3001/api/docs');
}
bootstrap();
//# sourceMappingURL=main.js.map