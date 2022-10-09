import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { GetEnv, validate } from "./configs/env.validations";
import { ConfigModule } from "@nestjs/config";
import { BasicStrategy } from "./configs/Basic.strategy";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "./api/users/users.module";
import { HelpersModule } from "./helpers/helpers.module";
import { DatabasesModule } from "./databases/databases.module";
import { FilesModule } from "./api/files/files.module";
import { UserProvider } from "./api/users/user.provider";

@Module({
  imports: [
    HelpersModule,
    ConfigModule.forRoot({ validate }),
    PassportModule,
    DatabasesModule,
    MongooseModule.forRoot(GetEnv("MONGO_URL")),
    UsersModule,
    FilesModule
  ],
  controllers: [AppController],
  providers: [AppService, BasicStrategy, ...UserProvider]
})
export class AppModule {
}
