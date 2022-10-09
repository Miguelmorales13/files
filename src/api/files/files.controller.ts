import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FilesService } from "./files.service";
import { ApiBadRequestResponse, ApiBasicAuth, ApiConsumes, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { User } from "../../decorators/user.decorator";
import { BasicAuthGuard } from "../../configs/BasicAuth.guard";
import { FileInfoDeleteDto } from "./dto/file-info-delete.dto";
import { FileCreateDto } from "./dto/file-create.dto";
import { FileCompleteDto } from "./dto/file-complete.dto";

@Controller("files")
@UseGuards(BasicAuthGuard)
@ApiBasicAuth()
@ApiTags("Files")
export class FilesController {
  constructor(private readonly filesService: FilesService) {
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("file"))
  create(@Body() created: FileCreateDto, @UploadedFiles() files) {
    return files.map(file => new FileCompleteDto(file));
  }

  @Get()
  findAll(@User("username") bucket: string) {
    return this.filesService.findAll(bucket);
  }

  @Get(":id")
  @ApiBadRequestResponse({ type: HttpException })
  findOne(@Param("id") id: string, @User("username") bucket: string) {
    return this.filesService.findOne(id, bucket);
  }

  @Get("download/:id")
  @ApiBadRequestResponse({ type: HttpException })
  async download(@Param("id") id: string, @User("username") bucket: string, @Res() res) {
    const filestream = await this.filesService.readStream(id, bucket);
    if (!filestream) {
      throw new HttpException("An error occurred while retrieving file", HttpStatus.EXPECTATION_FAILED);
    }
    const file = await this.filesService.findOne(id, bucket);
    res.header("Content-Type", file.contentType);
    res.header("Content-Disposition", "attachment; filename=" + file.filename);
    return filestream.pipe(res);
  }


  @Delete(":id")
  @ApiBadRequestResponse({ type: HttpException })
  @ApiCreatedResponse({ type: FileInfoDeleteDto })
  async remove(@Param("id") id: string, @User("username") bucket: string) {
    const filestream = await this.filesService.readStream(id, bucket);
    if (!filestream) {
      throw new HttpException("An error occurred during file deletion", HttpStatus.EXPECTATION_FAILED);
    }
    const file = await this.filesService.findOne(id, bucket);
    await this.filesService.remove(id, bucket);
    return {
      message: "File has been deleted",
      file: file
    };
  }
}
