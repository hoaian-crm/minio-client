import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const sync = async () => {
  const app = await NestFactory.create(AppModule);

  app.listen(process.env.APP_PORT);
};

sync();
