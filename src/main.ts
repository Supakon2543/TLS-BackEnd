import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000', // or use '*' for all origins in dev
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // only if you need to send cookies/auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
