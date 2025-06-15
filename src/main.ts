import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors();
  
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  app.setGlobalPrefix('api');
  
  const authService = app.get(AuthService);
  await authService.createInitialUsers();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap(); 