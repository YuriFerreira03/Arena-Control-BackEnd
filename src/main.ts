import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // —–– Logger simples
  app.use((req, _res, next) => {
    console.log(`[BACKEND] ${req.method} ${req.url}`);
    next();
  });

  // —–– Pipes globais
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // —–– (Opcional) prefixo global
  // app.setGlobalPrefix('api');

  // —–– Swagger
  const config = new DocumentBuilder()
    .setTitle('ArenaControl API')
    .setDescription('Documentação da API de Súmulas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Se tiver prefixo global, use SwaggerModule.setup('api', app, document);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
