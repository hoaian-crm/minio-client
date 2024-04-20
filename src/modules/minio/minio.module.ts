import { Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './minio.controller';
import { MinioValidators } from './mini.validators';

@Module({
  imports: [],
  exports: [MinioService],
  providers: [MinioService, MinioValidators],
  controllers: [MinioController],

})
export class MinioModule { }
