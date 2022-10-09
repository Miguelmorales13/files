import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { HelpersModule } from "../../helpers/helpers.module";
import { UserProvider } from "./user.provider";

@Module({
  imports: [HelpersModule],
  controllers: [UsersController],
  providers: [UsersService, ...UserProvider]
})
export class UsersModule {
}
