import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // class validation을 사용하려면 필요

  // swagger 문서 설정 아래에 해주면 동작 안함. 순서중요!
  app.use(
    '/api',
    basicAuth({
      challenge: true,
      users: { [process.env.API_DOCS_ID]: process.env.API_DOCS_PW },
    }),
  );

  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  // api 문서설정
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // cors 설정
  app.enableCors({
    origin: true, // 배포시 특정 url 등록
    credentials: true,
  });

  const port = process.env.PORT;
  await app.listen(port);
}
bootstrap();
