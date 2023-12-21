import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExampleModule } from './modules/example/example.module';
import { MinioModule } from './modules/minio/minio.module';
@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MinioModule,
    ExampleModule,
  ],
  controllers: [],
})
export class AppModule {}
