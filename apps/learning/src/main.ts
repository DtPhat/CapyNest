import { NestFactory } from '@nestjs/core';
import { LearningModule } from './learning.module';

async function bootstrap() {
  const app = await NestFactory.create(LearningModule);
  await app.listen(4000);
}
bootstrap();
