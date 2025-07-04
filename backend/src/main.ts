import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './auth/jwt/roles.guard';
import { Reflector } from '@nestjs/core';
import {JwtAuthGuard} from "./auth/jwt/jwt.guard";

async function bootstrap() {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  await app.listen(3001);
}
bootstrap();
