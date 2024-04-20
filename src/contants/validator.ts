export type ValidatorFn = (file: Express.Multer.File) => string | Promise<string>;
export type Validator = (message: string, args: any) => ValidatorFn;
export type Validators = {
  [type: string]: Validator;
}

export const validators = {
  maxSize: (message: string, size: number) => {
    return (file: Express.Multer.File) => {
      return file.size > size ? message : ""
    }
  },

  isImage: (message: string) => {
    return (file: Express.Multer.File) => {
      return ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype) ? "" : message
    }
  }

} satisfies Validators;
