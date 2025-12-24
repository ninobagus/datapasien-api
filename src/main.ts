import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS untuk frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger Configuration
  const config = new DocumentBuilder()
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
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
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
