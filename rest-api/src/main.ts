import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { FallbackExpectionFilter } from './filters/fallback.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(
    new FallbackExpectionFilter(),
    new HttpExceptionFilter(),
  );

  await app.listen(9000);
}

bootstrap();
