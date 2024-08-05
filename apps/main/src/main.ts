import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { Logger } from 'nestjs-pino'
import { ValidationPipe } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import cors from '@fastify/cors';

async function bootstrap() {
  // const app = await NestFactory.create(MainModule);
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );
  await app.register(cors, {
    origin: ['http://localhost:3000', 'https://capy-venture.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
    preflightContinue: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))
  await app.listen(4000);
}
bootstrap();
