import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { FallbackExpectionFilter } from './filters/fallback.filter';

import * as mongoose from 'mongoose';
import { ValidationPipe, ValidationError } from '@nestjs/common';
import { ValidationFilter } from './filters/validation.filter';
import { ValidationException } from './filters/validation.exception';

mongoose.set('useFindAndModify', false);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  // order matters
  app.useGlobalFilters(
    new FallbackExpectionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      // trigger when validation error occur
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors.map(
          error =>
            `${error.property} has wrong value ${error.value}, ${Object.values(
              error.constraints,
            ).join(', ')}`,
        );

        return new ValidationException(message);
      },
    }),
  );

  await app.listen(9000);
}

bootstrap();
