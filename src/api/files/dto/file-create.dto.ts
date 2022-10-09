import { ApiProperty } from "@nestjs/swagger";

export class FileCreateDto {

  @ApiProperty({ format: "binary", type: "file", required: true })
  file?: string;


}
