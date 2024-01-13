import { Module } from '@nestjs/common';
import { MinioModule } from '../minio/minio.module';
import { ExampleController } from './example.controller';

@Module({
  imports: [MinioModule],
  controllers: [ExampleController],
})
export class ExampleModule {}
