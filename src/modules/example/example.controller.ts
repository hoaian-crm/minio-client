import { Controller, Get, Post, Query } from '@nestjs/common';
import { MinioService } from '../minio/minio.service';

@Controller('example')
export class ExampleController {
  constructor(private minioService: MinioService) {}

  @Post('')
  async upload() {}

  @Get('/')
  async readFile(@Query() { path, bucket }: { path: string; bucket: string }) {
    return (await this.minioService.readFile(bucket, path)).toString();
  }

  @Get('/dir')
  async readDir(@Query() { path, bucket }: { path: string; bucket: string }) {
    return await this.minioService.readDir(bucket, path);
  }
}
