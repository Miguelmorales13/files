import { Module } from "@nestjs/common";
import { FilesService } from "./files.service";
import { FilesController } from "./files.controller";
import { MulterModule } from "@nestjs/platform-express";
import { GridFsMulterConfigService } from "../../helpers/grid-fs-multer-config/grid-fs-multer-config.service";

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService
    })

  ],
  controllers: [
    FilesController
  ],
  providers: [FilesService, GridFsMulterConfigService]
})
export class FilesModule {
}
