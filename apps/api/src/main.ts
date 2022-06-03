/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
        .setContact("Sadeq Saffar", "", "ssaffar@gmail.com")
        .setTitle("Easy Asset Management System")
        .setVersion('1.0')
        .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

  const globalPrefix = process.env.NX_API_PREFIX || 'api';
  app.setGlobalPrefix(globalPrefix);
console.log('port------', process.env.NX_API_PORT)
  const port = process.env.NX_API_PORT || 3333;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
