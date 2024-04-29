import { Injectable } from '@nestjs/common';
import { BucketItem, Client } from 'minio';

@Injectable()
export class MinioService {
  private client: Client;
  constructor() {
    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: +process.env.MINIO_PORT,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  async uploadFile(
    bucketName: string,
    path?: string,
    data?: Buffer | string,
  ) {
    return this.client.putObject(bucketName, path, data)
  }

  async readDir(
    bucketName: string,
    path?: string,
    recursive?: boolean,
  ): Promise<BucketItem[]> {
    return new Promise(async (resolve) => {
      const result: Array<BucketItem> = [];
      this.client
        .listObjects(bucketName, path, recursive)
        .on('data', (data) => {
          result.push(data);
        })
        .on('end', () => {
          resolve(result);
        });
    });
  }

  async readFile(bucketName: string, path?: string): Promise<Buffer> {
    const stream = await this.client.getObject(bucketName, path);
    return new Promise(async (resolve) => {
      const result: Array<Buffer> = [];
      stream.on('data', (chunk: Buffer) => {
        result.push(chunk);
      });
      stream.on('end', () => {
        resolve(Buffer.concat(result));
      });
    });
  }
}
