import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNumber({}, { message: "the id is numeric" })
  id?: number;
}
