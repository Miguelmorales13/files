import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GetEnv } from "./configs/env.validations";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";
import { join } from "path";
import * as fs from "fs/promises";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  const config = new DocumentBuilder()
    .setTitle("Files api")
    .setDescription("THe is is for save an get files in database")
    .setVersion("1.0")
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  console.log(join(__dirname, GetEnv("NODE_ENV") == "production" ? "../src" : "src", "swagger", GetEnv("THEME_SWAGGER")));
  SwaggerModule.setup("api", app, document, {
    customCss: (await fs.readFile(join(__dirname, GetEnv("NODE_ENV") == "production" ? "../src" : "src", "swagger", GetEnv("THEME_SWAGGER")))).toString()
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(GetEnv("PORT"));
}

bootstrap();
