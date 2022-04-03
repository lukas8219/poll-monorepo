import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Database from 'src/database';
import { Logger } from '@nestjs/common';
import syncDb from './database/migration';
import { i18n } from 'src/i18n/translation';
import { RequestValidationPipe } from './validation/RequestValidationPipe';
import { ControllerAdvice } from './handler/errorHandle';
import { NullFieldsInterceptor } from './interceptors/NullFieldsInterceptor';
import { mkdir } from 'fs';

async function bootstrap() {
  try {

    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ControllerAdvice());
    app.useGlobalInterceptors(new NullFieldsInterceptor());
    app.useGlobalPipes(new RequestValidationPipe());
    app.use(i18n.init);
    app.enableCors({
      origin: ['http://localhost:4200'],
    });

    mkdir('public/pasta', { recursive: true }, (err) => {
      Logger.error(err);
    });

    await Database.authenticate({
      logging: false,
    });

    await syncDb();
    await app.listen(8080);

  } catch (err) {
    Logger.error(err);
    throw err;
  }
}

bootstrap();
