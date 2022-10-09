import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBasicAuth, ApiTags } from "@nestjs/swagger";
import { User } from "../../decorators/user.decorator";
import { BasicAuthGuard } from "../../configs/BasicAuth.guard";

@Controller("users")
@ApiTags("Users")
@UseGuards(BasicAuthGuard)
@ApiBasicAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  findOne(@User("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch()
  update(@User("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete()
  remove(@User("id") id: string) {
    return this.usersService.remove(+id);
  }
}
