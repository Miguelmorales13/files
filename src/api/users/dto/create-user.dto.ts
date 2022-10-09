import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: "The property name is string" })
  @IsNotEmpty({ message: "The property name is required" })
  name?: string;

  @ApiProperty()
  @IsString({ message: "The property name is string" })
  @IsNotEmpty({ message: "The property lastName is required" })
  lastName?: string;

  @ApiProperty()
  @IsString({ message: "The property secondLastName is string" })
  secondLastName?: string;

  @ApiProperty()
  @IsBoolean({ message: "The property active is boolean" })
  active?: boolean;

  @ApiProperty()
  @IsEmail({}, { message: "The email is no format valid" })
  @IsNotEmpty({ message: "The property email is not empty" })
  email?: string;
}
