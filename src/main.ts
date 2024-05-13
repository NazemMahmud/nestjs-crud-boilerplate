import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from './app.module';
import { AllExceptionsFilter } from "./utils/exception.filter";
import { ResponseInterceptor } from "./utils/response.interceptor";


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true })); // request data validation

  app.useGlobalInterceptors(new ResponseInterceptor()); // success response format

  // to return/handle error exception
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(PORT);
}

bootstrap();