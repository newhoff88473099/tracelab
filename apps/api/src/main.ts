import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ── Global prefix ──────────────────────────────
  app.setGlobalPrefix('api');

  // ── CORS configuration ──────────────────────────
  app.enableCors();

  // ── Global validation pipes ──────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // ── Swagger UI configuration ─────────────────────
  const config = new DocumentBuilder()
    .setTitle('TraceLab AI API')
    .setDescription('REST API for TraceLab AI quality control platform')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // ── Server port binding ──────────────────────────
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 NestJS API bootstrap complete. Server running on port: ${port}`);
  console.log(`📑 OpenAPI documentation served at: http://localhost:${port}/api-docs`);
}
bootstrap();
