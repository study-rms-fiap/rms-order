import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { config } from 'dotenv';

function buildApiDocs(app: NestExpressApplication): void {
  const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('RMS Product')
    .setDescription(
      'Tech challenge for postgraduate studies in software architecture \n Order microservice',
    )
    .setVersion('1.0')
    .addTag('FIAP - Pós Software Architecture')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  buildApiDocs(app);
  const port = Number(config().parsed['PORT'] || process.env.PORT);
  console.info(`APP was assigned port ${port} to be executed`);
  await app.listen(port);
  console.info(`App RMS order is running on port  ${port}`);
}
bootstrap();
