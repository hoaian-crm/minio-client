import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { MinioService } from "./minio.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "@relationc/prototypes";
import { MinioValidators } from "./mini.validators";
import { UploadDto } from "./dto/upload";
import { randomUUID } from "crypto";


@Controller()
export class MinioController {

  constructor(private minioService: MinioService, private minioValidators: MinioValidators) { }

  @Post("/upload")
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() data: UploadDto) {

    await this.minioValidators.validate(file, data);

    const fileName = `${randomUUID()}.${file.originalname.split('.').reverse()[0]}`
    console.log('fileName: ', fileName);

    const response =
      await this.minioService.uploadFile('public',
        `${data.type}/${fileName}`,
        file.buffer);

    return Response.createSuccess({
      ...response,
      publicUrl: `https://${process.env.MINIO_ENDPOINT}/public/${data.type}/${fileName}`
    });
  }
} 
