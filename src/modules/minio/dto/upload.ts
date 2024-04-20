import { IsString } from "class-validator";

export class UploadDto {
  @IsString()
  type: string;
}
