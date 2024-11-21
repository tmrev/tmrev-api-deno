import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.ts";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("The Movie Review API")
    .setDescription("API for the TMREV app")
    .setVersion("1.0")
    .addApiKey({
      type: "apiKey",
      name: "authorization",
    }, "authorization")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  await app.listen(3000);
}

bootstrap();
