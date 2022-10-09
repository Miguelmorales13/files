import { IsEnum, IsNumber, IsString, validateSync } from "class-validator";
import { plainToClass } from "class-transformer";

enum EnvironmentTypes {
  Development = "development",
  Production = "production",
  Test = "test"
}

enum DialectsSequelize {
  Mysql = "mysql",
  PostgresSQL = "postgres",
  Mariadb = "mariadb"
}

enum ThemesSwagger {
  FEELINGBLUE = "theme-feeling-blue.css",
  FLATTOP = "theme-flattop.css",
  MATERIAL = "theme-material.css",
  MONOKAI = "theme-monokai.css",
  MUTED = "theme-muted.css",
  NEWSPAPER = "theme-newspaper.css",
  OUTLINE = "theme-outline.css"
}

class EnvValidations {

  @IsEnum(EnvironmentTypes, { message: "node envs es not accepted" })
  NODE_ENV: string;

  @IsString({ message: "the host is required" })
  HOST: string;

  @IsNumber({}, { message: "the port is undefined, please check your environments" })
  PORT: number;
  @IsString({ message: "the port is undefined, please check your environments" })
  MONGO_URL: string;

  @IsString({ message: "the port is undefined, please check your environments" })
  USERNAME_TEST: string;

  @IsString({ message: "the port is undefined, please check your environments" })
  PASSWORD_TEST: string;

  @IsEnum(DialectsSequelize, { message: "node envs es not accepted" })
  SEQUELIZE_DIALECT: string;

  @IsString({ message: "Secreto token is required for deploy" })
  SEQUELIZE_HOST: string;

  @IsNumber({}, { message: "the port is undefined, please check your environments" })
  SEQUELIZE_PORT: number;

  @IsString({ message: "Secreto token is required for deploy" })
  SEQUELIZE_USERNAME: string;

  @IsString({ message: "Secreto token is required for deploy" })
  SEQUELIZE_PASSWORD: string;

  @IsString({ message: "Secreto token is required for deploy" })
  SEQUELIZE_DATABASE: string;
  @IsString({ message: "Secreto token is required for deploy" })
  SEQUELIZE_SCHEMA: string;

  @IsString({ message: "Secreto token is required for deploy" })
  URL_EMAILS: string;

  @IsEnum(ThemesSwagger, { message: "theme swagger acepted" })
  THEME_SWAGGER: string;


}

export const validate = (config: Record<string, unknown>) => {
  console.log(config);
  if (GetEnv("NODE_ENV") != "production") {
    const validatedConfig = plainToClass(
      EnvValidations,
      config,
      { enableImplicitConversion: true }
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
      console.log(errors);
      // throw new Error(errors.toString());
    }
    return validatedConfig;

  }
};

export const GetEnv = (name: keyof EnvValidations): any => {
  return process.env[name];
};
