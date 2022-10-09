export class FileCompleteDto {

  originalname: string;
  encoding: string;
  mimetype: string;
  id: string;
  filename: string;
  metadata: string;
  bucketName: string;
  chunkSize: string;
  size: string;
  md5: string;
  uploadDate: string;
  contentType: string;


  constructor(object: any) {
    this.originalname = object["originalname"] ?? "";
    this.encoding = object["encoding"] ?? "";
    this.mimetype = object["mimetype"] ?? "";
    this.id = object["id"] ?? "";
    this.filename = object["filename"] ?? "";
    this.metadata = object["metadata"] ?? "";
    this.bucketName = "";
    this.chunkSize = object["chunkSize"] ?? "";
    this.size = object["size"] ?? "";
    this.md5 = object["md5"] ?? "";
    this.uploadDate = object["uploadDate"] ?? "";
    this.contentType = object["contentType"] ?? "";
  }
}
