import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.on('unhandledRejection', (err) => {
  console.log(err);
});

process.on('uncaughtException', (err) => {
  console.log(err);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
