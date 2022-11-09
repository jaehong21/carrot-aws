import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // allow all CORS
  app.enableCors({
    origin: function (origin, callback) {
      callback(null, origin);
      // if (!origin || whitelist.indexOf(origin) !== -1) {
      //   callback(null, origin);
      // } else {
      //   callback(new Error('Not allowed by CORS'));
      // }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
