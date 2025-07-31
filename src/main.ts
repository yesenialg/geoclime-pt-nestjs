import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   
  const configService = app.get(ConfigService);

  const port = configService.get<number>('APP_PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Geo Clime API')
    .setDescription('Geo Clime API')
    .setVersion('1.0')
    //.addBearerAuth()  // Si usas JWT
    //.addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' })  // Si usas API Key
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
