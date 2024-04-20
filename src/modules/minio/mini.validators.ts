import { Injectable } from "@nestjs/common";
import { ValidatorFn, validators } from "../../contants";
import { UploadDto } from "./dto/upload";
import { Response } from "@relationc/prototypes";




@Injectable()
export class MinioValidators {

  private typeValidator: Record<string, Array<ValidatorFn>>;

  constructor() {
    this.typeValidator = {
      avatar: [
        validators.maxSize("Avatar must be less than 1mb in size", 1000000),
        validators.isImage("Avatar must be an image")
      ]
    }
  }

  async validate(file: Express.Multer.File, data: UploadDto) {

    if (!file) {
      Response.badRequestThrow({
        description: `Not file to upload`,
        code: 40002
      })
    }

    const validators = this.typeValidator[data.type];
    if (!validators) {
      Response.badRequestThrow({
        description: `Type ${data.type} is not defined`,
        code: 40000
      })
    }
    let message: string = "";
    await Promise.all(validators.map(async validator => {
      if (message) return;
      const result = validator(file);
      if ((result as Promise<string>).then) {
        message = await result;
      } else {
        message = result as string;
      }
    }));

    if (message) this.handleMessage(message);
  }

  handleMessage(message: string) {
    Response.badRequestThrow({
      code: 40000,
      description: message,
    })
  }
}
