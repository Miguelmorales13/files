export class FileInfoDto {
  id: string;
  filename: string;
  length: string;
  chunkSize: string;
  md5: string;
  contentType: string;

  constructor(object: any) {
    this.id = object["_id"] ?? "";
    this.filename = object["filename"] ?? "";
    this.length = object["length"] ?? "";
    this.chunkSize = object["chunkSize"] ?? "";
    this.md5 = object["md5"] ?? "";
    this.contentType = object["contentType"] ?? "";
  }
}
