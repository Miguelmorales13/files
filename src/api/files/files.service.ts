import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { GridFSBucketReadStream } from "mongodb";
import { MongoGridFS } from "mongo-gridfs";
import { FileInfoDto } from "./dto/file-info.dto";

@Injectable()
export class FilesService {
  private fileModel: MongoGridFS;

  constructor(
    @InjectConnection() private readonly connection: Connection
  ) {
  }

  async readStream(id: string, bucket: string): Promise<GridFSBucketReadStream> {
    // @ts-ignore
    this.fileModel = new MongoGridFS(this.connection.db, bucket);
    return await this.fileModel.readFileStream(id);
  }

  async findOne(id: string, bucket: string): Promise<FileInfoDto> {
    // @ts-ignore
    this.fileModel = new MongoGridFS(this.connection.db, bucket);
    try {
      const result = await this.fileModel.findById(id);
      return new FileInfoDto(result);
    } catch (e) {
      throw new HttpException("File not found", HttpStatus.NOT_FOUND);
    }
  };

  async findAll(bucket: string): Promise<FileInfoDto[]> {
    // @ts-ignore
    this.fileModel = new MongoGridFS(this.connection.db, bucket);
    const result = await this.fileModel.find({});
    return result.map(model => new FileInfoDto(model));
  };

  // const collStats = await this.connection.db.collection(`${bucket}.files`).stats();
  // const Chunks = await this.connection.db.collection(`${bucket}.chunks`).stats();
  // console.log(collStats.size, Chunks.size);

  async remove(id: string, bucket: string): Promise<boolean> {
    // @ts-ignore
    this.fileModel = new MongoGridFS(this.connection.db, bucket);
    return await this.fileModel.delete(id);
  }
}
