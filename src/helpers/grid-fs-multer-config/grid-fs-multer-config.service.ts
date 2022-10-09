import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import { GridFsStorage } from "multer-gridfs-storage";
import { GetEnv } from "../../configs/env.validations";

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  // @ts-ignore
  private gridFsStorage: GridFsStorage;

  constructor() {
    this.gridFsStorage = new GridFsStorage({
      url: GetEnv("MONGO_URL"),
      file: (req, file) => {
        console.log("saven in", req.user, req.user["username"] ?? "fs");
        return new Promise((resolve, reject) => {
          const filename = file.originalname.trim();
          const fileInfo = {
            filename: filename,
            bucketName: req.user["username"] ?? "fs"
          };
          resolve(fileInfo);
        });
      }
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage
    };
  }
}
