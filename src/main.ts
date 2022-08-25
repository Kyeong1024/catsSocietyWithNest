import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class validation을 사용하려면 필요

  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true, // 배포시 특정 url 등록
    credentials: true,
  });

  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
