import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Middleware para corrigir charset errado (ex: "UTF-8" ou aspas)
  app.use((req, _res, next) => {
    const ct = req.headers['content-type'];
    if (ct) {
      req.headers['content-type'] = ct.replace(
        /charset="?UTF-8"?/i,
        'charset=utf-8',
      );
    }
    next();
  });

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
